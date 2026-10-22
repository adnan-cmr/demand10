import mongoose from 'mongoose';
import { getDataConnection } from '../../config/dataDb.js';

// Entry snapshots are self-contained so the list is independent of the 1M dataset.
// Rank = index in `entries`.
const entrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: String,
  website: String,
  employees: Number,
  industry: String,
  logo: String,
  linkedin: String,
  facebook: String,
  twitter: String,
  city: String,
  state: String,
  country: String,
  address: String,
  keywords: [String],
  technologies: [String],
  description: String,
  foundedYear: Number,
  profilePath: String, // /data/<industry>/<city>/<slug>
});

const topListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    entries: [entrySchema],
  },
  { timestamps: true }
);

const conn = getDataConnection();
export default conn.models.TopList || conn.model('TopList', topListSchema);
