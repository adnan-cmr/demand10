import express from 'express';
import { adminAuthMiddleware } from '../middleware/adminAuthMiddleware.js';
import { dataImportUpload, topListUpload } from '../middleware/dataUpload.js';
import {
  createTopList,
  deleteAllCompanies,
  deleteImport,
  deleteTopList,
  getCompany,
  getFacets,
  getImport,
  getTopList,
  getTopListById,
  listCompanies,
  listImports,
  listTopLists,
  moveTopListEntry,
  removeTopListEntry,
  reorderTopList,
  replaceTopListEntries,
  startImport,
  updateTopList,
} from '../controller/dataController.js';

const router = express.Router();

// ── Public ──
router.get('/data/companies', listCompanies);
router.get('/data/facets', getFacets);
router.get('/data/companies/:industry/:city/:slug', getCompany);
router.get('/data/top-lists', listTopLists);
router.get('/data/top-lists/:slug', getTopList);

// ── Admin: 1M dataset import ──
router.post('/admin/data/import', adminAuthMiddleware, dataImportUpload.single('file'), startImport);
router.get('/admin/data/imports', adminAuthMiddleware, listImports);
router.get('/admin/data/imports/:id', adminAuthMiddleware, getImport);
router.delete('/admin/data/imports/:id', adminAuthMiddleware, deleteImport);
router.delete('/admin/data/companies', adminAuthMiddleware, deleteAllCompanies);

// ── Admin: top-10 lists ──
router.post('/admin/data/top-lists', adminAuthMiddleware, topListUpload.single('file'), createTopList);
router.get('/admin/data/top-lists/:id', adminAuthMiddleware, getTopListById);
router.put('/admin/data/top-lists/:id', adminAuthMiddleware, updateTopList);
router.delete('/admin/data/top-lists/:id', adminAuthMiddleware, deleteTopList);
router.post('/admin/data/top-lists/:id/entries', adminAuthMiddleware, topListUpload.single('file'), replaceTopListEntries);
router.put('/admin/data/top-lists/:id/reorder', adminAuthMiddleware, reorderTopList);
router.put('/admin/data/top-lists/:id/entries/:entryId/move', adminAuthMiddleware, moveTopListEntry);
router.delete('/admin/data/top-lists/:id/entries/:entryId', adminAuthMiddleware, removeTopListEntry);

export default router;
