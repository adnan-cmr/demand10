import mongoose from 'mongoose';
import { getDataConnection } from '../../config/dataDb.js';

const schema = new mongoose.Schema(
  {
    filename: String,
    status: { type: String, enum: ['running', 'completed', 'failed', 'deleting'], default: 'running' },
    processed: { type: Number, default: 0 },
    inserted: { type: Number, default: 0 },
    updated: { type: Number, default: 0 },
    skipped: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    error: String,
    startedAt: { type: Date, default: Date.now },
    finishedAt: Date,
  },
  { timestamps: true }
);

const conn = getDataConnection();
export default conn.models.DataImportJob || conn.model('DataImportJob', schema);
