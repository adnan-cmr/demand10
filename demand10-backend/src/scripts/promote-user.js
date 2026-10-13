// backend/src/scripts/promote-user.js
/**
 * Promote a user's role.
 * Usage:  node src/scripts/promote-user.js user@example.com admin
 *         node src/scripts/promote-user.js user@example.com superadmin
 */

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import User from '../model/User.js';

const [, , email, role] = process.argv;

if (!email || !role) {
  console.error('Usage: node src/scripts/promote-user.js <email> <role>');
  console.error('  role: user | vendor | admin | superadmin');
  process.exit(1);
}

const allowed = ['user', 'vendor', 'admin', 'superadmin'];
if (!allowed.includes(role)) {
  console.error(`Invalid role: ${role}`);
  console.error(`Allowed: ${allowed.join(' | ')}`);
  process.exit(1);
}

(async () => {
  await mongoose.connect(env.MONGO_URI);
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role },
    { new: true }
  );
  if (!user) {
    console.error(`No user found with email: ${email}`);
    await mongoose.disconnect();
    process.exit(1);
  }
  console.log(`✅ ${user.email} → ${user.role}`);
  await mongoose.disconnect();
  process.exit(0);
})();