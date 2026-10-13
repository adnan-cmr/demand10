import User from '../model/User.js';

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({ deletedAt: null }).select('-password').sort({ createdAt: -1 });
    return res.json({ ok: true, count: users.length, users });
  } catch (err) {
    console.error('Get all users error:', err);
    return res.status(500).json({ ok: false, message: 'Failed to fetch users' });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    return res.json({ ok: true, message: 'User deleted successfully', user });
  } catch (err) {
    console.error('Delete user error:', err);
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
    console.error(`Update user status error (${status}):`, err);
    return res.status(500).json({ ok: false, message: 'Error updating user status' });
  }
}

export const blockUser = (req, res) => updateUserStatus(req, res, 'blocked');
export const activateUser = (req, res) => updateUserStatus(req, res, 'active');
