import multer from 'multer';
import os from 'os';
import path from 'path';

const allowed = /\.(xlsx|xlsm|xls|csv|tsv|txt)$/i;
const fileFilter = (req, file, cb) =>
  allowed.test(file.originalname)
    ? cb(null, true)
    : cb(Object.assign(new Error('Invalid file type'), { statusCode: 400, publicMessage: 'Only Excel (.xlsx, .xls) or .csv files are allowed' }));

// Large dataset imports: streamed from disk, never held in memory.
export const dataImportUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, os.tmpdir()),
    filename: (req, file, cb) =>
      cb(null, `d10-import-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
  fileFilter,
});

// Top-10 files are tiny: keep in memory.
export const topListUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
