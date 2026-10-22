// Separate database for the large (1M+) company dataset and top-10 lists.
import mongoose from 'mongoose';
import { env } from './env.js';

let conn;

/**
 * DATA_MONGO_URI -> dedicated server/cluster.
 * Otherwise a sibling database (DATA_DB_NAME, default "demand10_data") on the main connection's server.
 */
export function getDataConnection() {
  if (conn) return conn;
  if (process.env.DATA_MONGO_URI) {
    conn = mongoose.createConnection(process.env.DATA_MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } else {
    conn = mongoose.connection.useDb(process.env.DATA_DB_NAME || 'rankb2b', {
      useCache: true,
    });
  }
  return conn;
}

export default getDataConnection;
