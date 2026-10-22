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
    req.log.error({ err }, 'updateUserRole failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}

/**
 * List all users (admin only)
 * GET /api/v1/admin/users
 */
export async function listUsers(req, res) {
  try {
    const users = await User.find({ deletedAt: null })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    return res.json({ ok: true, count: users.length, users });
  } catch (err) {
    req.log.error({ err }, 'listUsers failed');
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
}
/**
 * Soft-delete a user. DELETE /api/v1/admin/users/:userId
 */
export async function deleteUser(req, res) {
  try {
    if (String(req.user?.userId) === req.params.userId) {
      return res.status(400).json({ ok: false, message: 'You cannot delete your own account' });
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    return res.json({ ok: true, message: 'User deleted successfully', user });
  } catch (err) {
    req.log.error({ err }, 'deleteUser failed');
    return res.status(500).json({ ok: false, message: 'Error deleting user' });
  }
}

async function updateUserStatus(req, res, status) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId, deletedAt: null },
      { status },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    return res.json({ ok: true, message: `User ${status === 'blocked' ? 'blocked' : 'activated'} successfully`, user });
  } catch (err) {
    req.log.error({ err, status }, 'updateUserStatus failed');
    return res.status(500).json({ ok: false, message: 'Error updating user status' });
  }
}

export const blockUser = (req, res) => updateUserStatus(req, res, 'blocked');
export const activateUser = (req, res) => updateUserStatus(req, res, 'active');