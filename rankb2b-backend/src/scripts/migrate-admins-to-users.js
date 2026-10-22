// backend/src/scripts/migrate-admins-to-users.js
/**
 * One-shot migration:
 *   For every document in the old `users` (AdminUser) collection,
 *   ensure a matching document exists in the new `users` (User) collection
 *   with role = 'admin'.
 *
 * Idempotent: safe to run multiple times.
 *
 * Dry-run by default (nothing is written). Pass --confirm to apply.
 * The first admin is promoted to superadmin only if you also set
 * PROMOTE_FIRST_ADMIN=1 together with --confirm.
 *
 * Usage:
 *   1. Back up your DB:  mongodump --db postzio --out ./backups/pre-phase2
 *   2. node src/scripts/migrate-admins-to-users.js
 *   3. Verify in mongosh:  db.users.find({ role: 'admin' })
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { env } from '../config/env.js';
import User from '../model/User.js';

// Old AdminUser model — re-declare locally to avoid importing the deprecated file
// (which would register the same collection name and may conflict).
const legacyAdminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    role: { type: String, default: 'admin' },
  },
  { collection: 'users', strict: false }
);

const confirm = process.argv.includes('--confirm') && process.env.DRY_RUN !== '1';

async function run() {
  if (!confirm) console.log('DRY RUN: no changes will be written. Use --confirm to apply.');
  await mongoose.connect(env.MONGO_URI);
  // console.log('✅ Connected to MongoDB');

  const rawCollection = mongoose.connection.db.collection('users');

  // All docs in the users collection that DON'T have isEmailVerified field
  // are likely legacy admin docs (because the new User schema always has it)
  const legacyAdmins = await rawCollection
    .find({ isEmailVerified: { $exists: false } })
    .toArray();

  console.log(`Found ${legacyAdmins.length} legacy admin users to migrate`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const doc of legacyAdmins) {
    if (!doc.email || !doc.password) {
      skipped++;
      continue;
    }

    const email = doc.email.toLowerCase();
    const existing = await User.findOne({ email });

    if (existing) {
      // Already a new User — just ensure role is admin/superadmin
      if (!['admin', 'superadmin'].includes(existing.role)) {
        existing.role = 'admin';
        if (confirm) await existing.save();
        updated++;
      } else {
        skipped++;
      }
      continue;
    }

    // Create new User
    const hashed = doc.password.startsWith('$2')
      ? doc.password                        // already bcrypt
      : await bcrypt.hash(doc.password, 12); // plain (rare) — hash it

    if (!confirm) {
      created++;
      continue;
    }
    await rawCollection.updateOne(
      { _id: doc._id },
      {
        $set: {
          email,
          password: hashed,
          name: doc.name || '',
          role: 'admin',
          status: 'active',
          isEmailVerified: true,
          createdAt: doc.createdAt || new Date(),
          updatedAt: new Date(),
        },
        $unset: {
          // Optional cleanup — remove non-schema fields if any
        },
      }
    );
    created++;
  }

  console.log(`✅ Migration complete`);
  console.log(`   created: ${created}`);
  console.log(`   updated: ${updated}`);
  console.log(`   skipped: ${skipped}`);

  // Ensure at least one superadmin exists
  const superAdminCount = await User.countDocuments({ role: 'superadmin' });
  if (superAdminCount === 0 && process.env.PROMOTE_FIRST_ADMIN !== '1') {
    console.log('No superadmin exists. Re-run with --confirm and PROMOTE_FIRST_ADMIN=1, or use promote-user.js.');
  } else if (superAdminCount === 0 && !confirm) {
    console.log('[dry-run] would promote the oldest admin to superadmin.');
  } else if (superAdminCount === 0) {
    const firstAdmin = await User.findOne({ role: 'admin' }).sort({ createdAt: 1 });
    if (firstAdmin) {
      firstAdmin.role = 'superadmin';
      await firstAdmin.save();
      console.log(`✅ Promoted ${firstAdmin.email} to superadmin`);
    } else {
      console.log('⚠️  No admin found to promote. Create one via /auth/register and run:');
      console.log('    node src/scripts/promote-user.js <email> superadmin');
    }
  }

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});