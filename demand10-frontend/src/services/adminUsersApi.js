// Admin user management (all on /admin/users).
import { request } from './apiClient';

const unwrap = (res, fallback) => {
  if (!res.ok) throw new Error(res.message || fallback);
  return res;
};

export const getAdminUsers = async () => unwrap(await request('/admin/users'), 'Failed to fetch users').users || [];

export const deleteAdminUserById = async (userId) =>
  unwrap(await request(`/admin/users/${userId}`, { method: 'DELETE' }), 'Failed to delete user');

export const blockUserById = async (userId) =>
  unwrap(await request(`/admin/users/${userId}/block`, { method: 'PUT' }), 'Failed to block user');

export const activateUserById = async (userId) =>
  unwrap(await request(`/admin/users/${userId}/activate`, { method: 'PUT' }), 'Failed to activate user');

export const createUserAccount = async (data) =>
  request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
