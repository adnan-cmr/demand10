// backend/src/config/db.js
import mongoose from 'mongoose';
import { env } from './env.js';

const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 2000;

export default async function connectDB() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      await mongoose.connect(env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('✅ MongoDB connected');
      return;
    } catch (err) {
      console.error(
        `❌ MongoDB connection attempt ${attempt}/${MAX_ATTEMPTS} failed: ${err.message}`
      );
      if (attempt === MAX_ATTEMPTS) {
        console.error('❌ Exhausted retries. Continuing without DB — API will 503.');
        return; // ← do NOT process.exit. Let the app stay up; health check reports failure.
      }
      const delay = BASE_DELAY_MS * attempt;
      console.log(`   Retrying in ${delay}ms…`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}