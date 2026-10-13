// backend/src/features/auth/adminUserController.js
import User from '../../model/User.js';

/**
 * Promote/demote a user's role. Superadmin only.
 * PUT /api/v1/admin/users/:userId/role
 * body: { role: 'user'|'vendor'|'admin'|'superadmin' }
 */
export async function updateUserRole(req, res) {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const allowed = ['user', 'vendor', 'admin', 'superadmin'];
    if (!allowed.includes(role)) {
      return res.status(400).json({ ok: false, message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });

    return res.json({
      ok: true,
      message: 'Role updated',
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('updateUserRole error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

/**
 * List all users (admin only)
 * GET /api/v1/admin/users
 */
export async function listUsers(req, res) {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ ok: true, count: users.length, users });
  } catch (err) {
    console.error('listUsers error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}