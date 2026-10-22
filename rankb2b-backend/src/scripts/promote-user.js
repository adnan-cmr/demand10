// backend/src/scripts/promote-user.js
/**
 * Change a user's role. Dry-run by default; add --confirm to write.
 * Usage:  node src/scripts/promote-user.js user@example.com admin --confirm
 *         ALLOW_SUPERADMIN_PROMOTION=1 node src/scripts/promote-user.js user@example.com superadmin --confirm
 */

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import User from '../model/User.js';

const args = process.argv.slice(2);
const confirm = args.includes('--confirm');
const [email, role] = args.filter((a) => !a.startsWith('--'));

if (!email || !role) {
  console.error('Usage: node src/scripts/promote-user.js <email> <role> [--confirm]');
  console.error('  role: user | vendor | admin | superadmin');
  process.exit(1);
}

const allowed = ['user', 'vendor', 'admin', 'superadmin'];
if (!allowed.includes(role)) {
  console.error(`Invalid role: ${role}`);
  console.error(`Allowed: ${allowed.join(' | ')}`);
  process.exit(1);
}

if (role === 'superadmin' && process.env.ALLOW_SUPERADMIN_PROMOTION !== '1') {
  console.error('Refusing to grant superadmin: set ALLOW_SUPERADMIN_PROMOTION=1 to allow it.');
  process.exit(1);
}

(async () => {
  await mongoose.connect(env.MONGO_URI);
  const filter = { email: email.toLowerCase() };

  if (!confirm) {
    const current = await User.findOne(filter).select('email role');
    console.log(
      current
        ? `[dry-run] would change ${current.email}: ${current.role} -> ${role}. Re-run with --confirm to apply.`
        : `[dry-run] no user found with email: ${email}`
    );
    await mongoose.disconnect();
    process.exit(0);
  }

  const user = await User.findOneAndUpdate(filter, { role }, { new: true });
  if (!user) {
    console.error(`No user found with email: ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }
  console.log(`${user.email} -> ${user.role}`);
  await mongoose.disconnect();
  process.exit(0);
})();
