// Admin data endpoints (cookie-authenticated, browser only).
import { request } from './apiClient';
import { TOP_LISTS_CHANGED } from './publicDataApi';

const json = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const buildForm = (file, { hasHeader = true, separator = '', ...fields } = {}) => {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('hasHeader', String(hasHeader));
  if (separator) fd.append('separator', separator);
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v ?? ''));
  return fd;
};

const notifyTopLists = (res) => {
  if (res?.ok && typeof window !== 'undefined') window.dispatchEvent(new Event(TOP_LISTS_CHANGED));
  return res;
};

export const startDataImport = (file, opts) =>
  request('/admin/data/import', { method: 'POST', body: buildForm(file, opts) });
export const getDataImport = (id) => request(`/admin/data/imports/${id}`);
export const listDataImports = () => request('/admin/data/imports');
export const deleteDataImport = (id) => request(`/admin/data/imports/${id}`, { method: 'DELETE' });
export const deleteAllDataCompanies = () => request('/admin/data/companies', { method: 'DELETE' });

export const createTopList = async (file, { title, description, ...opts }) =>
  notifyTopLists(await request('/admin/data/top-lists', {
    method: 'POST',
    body: buildForm(file, { ...opts, title, description: description || '' }),
  }));
export const getAdminTopList = (id) => request(`/admin/data/top-lists/${id}`);
export const updateTopList = async (id, body) =>
  notifyTopLists(await request(`/admin/data/top-lists/${id}`, json('PUT', body)));
export const deleteTopList = async (id) =>
  notifyTopLists(await request(`/admin/data/top-lists/${id}`, { method: 'DELETE' }));
export const reorderTopList = async (id, order) =>
  notifyTopLists(await request(`/admin/data/top-lists/${id}/reorder`, json('PUT', { order })));
export const moveTopListEntry = async (id, entryId, position) =>
  notifyTopLists(await request(`/admin/data/top-lists/${id}/entries/${entryId}/move`, json('PUT', { position })));
export const removeTopListEntry = async (id, entryId) =>
  notifyTopLists(await request(`/admin/data/top-lists/${id}/entries/${entryId}`, { method: 'DELETE' }));
export const replaceTopListEntries = async (id, file, opts) =>
  notifyTopLists(await request(`/admin/data/top-lists/${id}/entries`, { method: 'POST', body: buildForm(file, opts) }));
