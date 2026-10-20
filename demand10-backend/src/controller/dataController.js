import fs from 'fs';
import { Readable } from 'stream';
import csv from 'csv-parser';
import XLSX from 'xlsx';
import DataCompany from '../model/data/DataCompany.js';
import DataImportJob from '../model/data/DataImportJob.js';
import TopList from '../model/data/TopList.js';
import { columnsFromHeader, DEFAULT_COLUMNS, normalizeRow, shortHash, slugify } from '../utils/dataParser.js';

const BATCH_SIZE = 1000;
const MAX_TOP_ENTRIES = 10;

const LIST_FIELDS = 'name slug domain website employees industry industrySlug logo city citySlug state country countrySlug description foundedYear';

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const asStr = (v) => (typeof v === 'string' ? v.trim() : '');
const asInt = (v) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
};

// ───────────────────────── parsing helpers ─────────────────────────

const isExcel = (filename) => /\.(xlsx|xlsm|xls)$/i.test(filename || '');

function csvOptions(separator) {
  // TSV exports contain stray " characters, so quoting is only honoured for real CSV files
  return { separator, headers: false, quote: separator === ',' ? '"' : '\u0001', strict: false, skipLines: 0 };
}

const rowToCells = (row) => {
  const n = Object.keys(row).length;
  return Array.from({ length: n }, (_, i) => row[i]);
};

function separatorFor(filename, requested) {
  if (requested === 'comma') return ',';
  if (requested === 'tab') return '\t';
  return /\.csv$/i.test(filename || '') ? ',' : '\t';
}

/** Yields raw cell arrays from an Excel workbook (first sheet), a CSV or a TSV, from a path or a buffer. */
async function* readRows({ path, buffer, filename, separator }) {
  if (isExcel(filename)) {
    const wb = path
      ? XLSX.readFile(path, { dense: true, cellDates: false })
      : XLSX.read(buffer, { type: 'buffer', dense: true, cellDates: false });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    if (!sheet) return;
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: '', blankrows: false });
    for (const cells of rows) yield cells;
    return;
  }
  const readable = path ? fs.createReadStream(path) : Readable.from(buffer);
  for await (const row of readable.pipe(csv(csvOptions(separator)))) yield rowToCells(row);
}

/** Streams rows from an upload, auto-detecting a header row. Yields normalised docs. */
async function* streamCompanies(source, hasHeader) {
  let columns = DEFAULT_COLUMNS;
  let expected = 0;
  let first = true;
  let pending = null;
  let merges = 0;
  for await (const raw of readRows(source)) {
    let cells = raw;
    if (first) {
      first = false;
      if (hasHeader !== false) {
        const fromHeader = columnsFromHeader(cells);
        if (fromHeader) {
          columns = fromHeader;
          expected = cells.length;
          continue;
        }
      }
    }
    // A description containing line breaks arrives as a short row followed by its remainder: glue them back together.
    if (pending) {
      cells = [...pending.slice(0, -1), `${pending[pending.length - 1] ?? ''} ${cells[0] ?? ''}`, ...cells.slice(1)];
      pending = null;
    }
    if (expected && cells.length < expected && merges < 50 && !isExcel(source.filename)) {
      pending = cells;
      merges += 1;
      continue;
    }
    merges = 0;
    yield normalizeRow(cells, columns);
  }
  if (pending) yield normalizeRow(pending, columns);
}

// ───────────────────────── facet cache ─────────────────────────

const facetCache = new Map();
const FACET_TTL_MS = 10 * 60 * 1000;
const COMPANY_TTL_MS = 2 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;
const clearFacetCache = () => facetCache.clear();

async function cached(key, loader, ttl = FACET_TTL_MS) {
  const now = Date.now();
  const hit = facetCache.get(key);
  if (hit && hit.expires > now) return hit.value;
  const value = await loader();
  if (value === undefined) return value;
  if (facetCache.size >= CACHE_MAX_ENTRIES) {
    for (const [k, v] of facetCache) if (v.expires <= now) facetCache.delete(k);
    // still full: evict the oldest entries (Map keeps insertion order)
    for (const k of facetCache.keys()) {
      if (facetCache.size < CACHE_MAX_ENTRIES) break;
      facetCache.delete(k);
    }
  }
  facetCache.set(key, { value, expires: now + ttl });
  return value;
}

// 2h → 6h: heartbeat persists every 30s, but a badly throttled server may still
// slip a few minutes; 6h gives generous headroom without a real dead job lingering.
const STALE_JOB_MS = 6 * 60 * 60 * 1000;
const activeJob = (extra = {}) =>
  DataImportJob.exists({
    status: { $in: ['running', 'deleting'] },
    updatedAt: { $gt: new Date(Date.now() - STALE_JOB_MS) },
    ...extra,
  });

// ───────────────────────── bulk import ─────────────────────────

async function flushBatch(batch, job, jobId) {
  const byKey = new Map();
  for (const doc of batch) byKey.set(doc.key, doc);
  const docs = [...byKey.values()];
  job.skipped += batch.length - docs.length;

  // LinkedIn id is the primary key; legacy domain keys are matched so old records get updated, not duplicated
  const toOp = ({ legacyKey, ...doc }) => {
    const match = [{ key: doc.key }];
    if (doc.linkedinId) match.push({ linkedinId: doc.linkedinId });
    if (legacyKey && legacyKey !== doc.key) match.push({ key: legacyKey });
    return {
      updateOne: {
        filter: match.length > 1 ? { $or: match } : match[0],
        update: jobId ? { $set: doc, $addToSet: { importIds: jobId } } : { $set: doc },
        upsert: true,
      },
    };
  };

  const run = async (ops) => {
    try {
      const res = await DataCompany.bulkWrite(ops, { ordered: false });
      job.inserted += res.upsertedCount || 0;
      job.updated += res.modifiedCount || 0;
      return [];
    } catch (err) {
      if (!err.writeErrors) throw err;
      job.inserted += err.result?.upsertedCount || 0;
      job.updated += err.result?.modifiedCount || 0;
      return err.writeErrors.filter((e) => e.code === 11000).map((e) => ops[e.index]);
    }
  };

  const failedOps = await run(docs.map(toOp));
  if (failedOps.length) {
    // same name in same industry/city: disambiguate URL slug
    const retry = failedOps.map((op) => {
      const doc = op.updateOne.update.$set;
      return toOp({ ...doc, slug: `${doc.slug}-${shortHash(doc.key)}` });
    });
    const stillFailed = await run(retry);
    job.failed += stillFailed.length;
  }
}

async function runImport(jobId, filePath, filename, separator, hasHeader) {
  const job = { processed: 0, inserted: 0, updated: 0, skipped: 0, failed: 0 };
  const persist = (extra = {}) =>
    DataImportJob.updateOne({ _id: jobId }, { $set: { ...job, ...extra } });

  // Persist on a wall-clock timer so `activeJob()` never mistakes a slow import
  // for a dead one (BATCH_SIZE * 5 rows can take >2h on a very large file).
  const heartbeat = setInterval(() => {
    persist().catch((err) => console.error('import heartbeat failed', err.message));
  }, 30_000);

  try {
    await DataCompany.init();
    let batch = [];
    for await (const doc of streamCompanies({ path: filePath, filename, separator }, hasHeader)) {
      job.processed += 1;
      if (!doc) {
        job.skipped += 1;
        continue;
      }
      batch.push(doc);
      if (batch.length >= BATCH_SIZE) {
        await flushBatch(batch, job, jobId);
        batch = [];
        if (job.processed % (BATCH_SIZE * 5) === 0) await persist();
      }
    }
    if (batch.length) await flushBatch(batch, job, jobId);
    await persist({ status: 'completed', finishedAt: new Date() });
  } catch (err) {
    await persist({ status: 'failed', error: String(err.message).slice(0, 500), finishedAt: new Date() });
  } finally {
    clearInterval(heartbeat);
    clearFacetCache();
    fs.promises.unlink(filePath).catch(() => {});
  }
}

export async function startImport(req, res) {
  const discard = () => req.file?.path && fs.promises.unlink(req.file.path).catch(() => {});
  try {
    if (!req.file) return res.status(400).json({ ok: false, message: 'Upload an Excel (.xlsx/.xls) or .csv file in field "file".' });
    if (await activeJob({ status: 'deleting' })) {
      await discard();
      return res.status(409).json({ ok: false, message: 'A delete is in progress. Try again in a moment.' });
    }
    const separator = separatorFor(req.file.originalname, req.body.separator);
    const hasHeader = req.body.hasHeader === 'false' ? false : true;

    const job = await DataImportJob.create({ filename: req.file.originalname });
    runImport(job._id, req.file.path, req.file.originalname, separator, hasHeader);
    return res.status(202).json({ ok: true, jobId: job._id });
  } catch (err) {
    await discard();
    throw err;
  }
}

export async function deleteImport(req, res) {
  const id = req.params.id;
  if (!/^[a-f0-9]{24}$/i.test(id)) return res.status(400).json({ ok: false, message: 'Invalid import id' });
  const job = await DataImportJob.findById(id);
  if (!job) return res.status(404).json({ ok: false, message: 'Import not found' });
  // Cleanup relies on exact importIds arrays, so no import or other delete may run at the same time.
  if (await activeJob()) {
    return res.status(409).json({ ok: false, message: 'Another import or delete is running. Wait for it to finish.' });
  }

  const claimed = await DataImportJob.findOneAndUpdate(
    { _id: job._id, status: { $in: ['completed', 'failed'] } },
    { $set: { status: 'deleting' } }
  );
  if (!claimed) return res.status(409).json({ ok: false, message: 'This file is still being processed' });

  (async () => {
    try {
      // records that only came from this file are removed; shared records just lose the link
      await DataCompany.deleteMany({ importIds: { $size: 1, $all: [job._id] } });
      await DataCompany.updateMany({ importIds: job._id }, { $pull: { importIds: job._id } });
      await DataImportJob.deleteOne({ _id: job._id });
    } catch (err) {
      req.log?.error({ err }, 'deleteImport cleanup failed');
      await DataImportJob.updateOne({ _id: job._id }, { $set: { status: 'failed', error: String(err.message).slice(0, 500) } });
    } finally {
      clearFacetCache();
    }
  })();
  return res.status(202).json({ ok: true });
}

export async function deleteAllCompanies(req, res) {
  if (await activeJob()) {
    return res.status(409).json({ ok: false, message: 'An import or delete is running. Wait for it to finish.' });
  }
  const { deletedCount } = await DataCompany.deleteMany({});
  await DataImportJob.deleteMany({ status: { $in: ['completed', 'failed'] } });
  clearFacetCache();
  return res.json({ ok: true, deleted: deletedCount });
}

export async function getImport(req, res) {
  const job = await DataImportJob.findById(req.params.id).lean();
  if (!job) return res.status(404).json({ ok: false, message: 'Import not found' });
  return res.json({ ok: true, job });
}

export async function listImports(req, res) {
  const jobs = await DataImportJob.find().sort({ createdAt: -1 }).limit(100).lean();
  const total = await DataCompany.estimatedDocumentCount();
  return res.json({ ok: true, jobs, total });
}

// ───────────────────────── public company data ─────────────────────────

export async function listCompanies(req, res) {
  const q = req.query;
  const limit = Math.min(Math.max(asInt(q.limit) || 24, 1), 100);
  const filter = {};

  const name = asStr(q.q).toLowerCase().slice(0, 100);
  if (name) filter.nameLower = { $regex: `^${escapeRegex(name)}` };
  if (asStr(q.industry)) filter.industrySlug = asStr(q.industry);
  if (asStr(q.city)) filter.citySlug = asStr(q.city);
  if (asStr(q.country)) filter.countrySlug = asStr(q.country);

  const empMin = asInt(q.employeesMin);
  const empMax = asInt(q.employeesMax);
  if (empMin !== undefined || empMax !== undefined) {
    filter.employees = {};
    if (empMin !== undefined) filter.employees.$gte = empMin;
    if (empMax !== undefined) filter.employees.$lte = empMax;
  }
  const fMin = asInt(q.foundedFrom);
  const fMax = asInt(q.foundedTo);
  if (fMin !== undefined || fMax !== undefined) {
    filter.foundedYear = {};
    if (fMin !== undefined) filter.foundedYear.$gte = fMin;
    if (fMax !== undefined) filter.foundedYear.$lte = fMax;
  }

  // keyset pagination: stable and fast at any depth (name search orders by name)
  const byName = Boolean(name);
  const after = asStr(q.after);
  if (after) {
    if (byName) {
      const [n, id] = after.split('|');
      filter.$or = [{ nameLower: { $gt: n } }, { nameLower: n, _id: { $gt: id } }];
    } else if (/^[a-f0-9]{24}$/i.test(after)) {
      filter._id = { $gt: after };
    }
  }

  const sort = byName ? { nameLower: 1, _id: 1 } : { _id: 1 };
  const rows = await DataCompany.find(filter).select(LIST_FIELDS).sort(sort).limit(limit + 1).lean();
  const hasMore = rows.length > limit;
  if (hasMore) rows.pop();
  const last = rows[rows.length - 1];
  const nextCursor = hasMore && last ? (byName ? `${last.nameLower}|${last._id}` : String(last._id)) : null;

  const unfiltered = !name && !after && !Object.keys(filter).length;
  return res.json({
    ok: true,
    companies: rows,
    nextCursor,
    total: unfiltered ? await DataCompany.estimatedDocumentCount() : undefined,
  });
}

export async function getFacets(req, res) {
  const country = asStr(req.query.country);
  const industries = await cached('industries', () =>
    DataCompany.aggregate([
      { $group: { _id: { slug: '$industrySlug', label: '$industry' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 200 },
      { $project: { _id: 0, slug: '$_id.slug', label: '$_id.label', count: 1 } },
    ])
  );
  const countries = await cached('countries', () =>
    DataCompany.aggregate([
      { $match: { countrySlug: { $ne: null } } },
      { $group: { _id: { slug: '$countrySlug', label: '$country' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 250 },
      { $project: { _id: 0, slug: '$_id.slug', label: '$_id.label', count: 1 } },
    ])
  );
  const cities = country
    ? await cached(`cities:${country}`, () =>
        DataCompany.aggregate([
          { $match: { countrySlug: country } },
          { $group: { _id: { slug: '$citySlug', label: '$city' }, count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 200 },
          { $project: { _id: 0, slug: '$_id.slug', label: '$_id.label', count: 1 } },
        ])
      )
    : [];
  return res.json({ ok: true, industries, countries, cities });
}

export async function getCompany(req, res) {
  const { industry, city, slug } = req.params;
  const payload = await cached(
    `company:${industry}/${city}/${slug}`,
    async () => {
      const company = await DataCompany.findOne({ industrySlug: industry, citySlug: city, slug })
        .select('-key -legacyKey -importIds -linkedinId -__v')
        .lean();
      if (!company) return undefined;

      // related companies: same industry (prefer same city), for internal linking
      const pick = 'name slug industry industrySlug logo city citySlug country employees';
      const sameCity = await DataCompany.find({ industrySlug: industry, citySlug: city, _id: { $ne: company._id } })
        .select(pick).limit(6).lean();
      let similar = sameCity;
      if (similar.length < 6) {
        const more = await DataCompany.find({
          industrySlug: industry,
          _id: { $nin: [company._id, ...sameCity.map((s) => s._id)] },
        }).select(pick).limit(6 - similar.length).lean();
        similar = [...similar, ...more];
      }
      return { company, similar };
    },
    COMPANY_TTL_MS
  );
  if (!payload) return res.status(404).json({ ok: false, message: 'Company not found' });
  res.set('Cache-Control', 'public, max-age=60, s-maxage=300, stale-while-revalidate=600');
  return res.json({ ok: true, ...payload });
}
// ───────────────────────── top-10 lists ─────────────────────────

const profilePath = (d) => `/data/${d.industrySlug}/${d.citySlug}/${d.slug}`;

const toEntry = (d) => ({
  name: d.name,
  domain: d.domain,
  website: d.website,
  employees: d.employees,
  industry: d.industry,
  logo: d.logo,
  linkedin: d.linkedin,
  facebook: d.facebook,
  twitter: d.twitter,
  city: d.city,
  state: d.state,
  country: d.country,
  address: d.address,
  keywords: d.keywords,
  technologies: d.technologies,
  description: d.description,
  foundedYear: d.foundedYear,
  profilePath: profilePath(d),
});

async function parseEntries(buffer, filename, body) {
  const docs = [];
  const stream = streamCompanies(
    { buffer, filename, separator: separatorFor(filename, body.separator) },
    body.hasHeader === 'false' ? false : true
  );
  for await (const doc of stream) {
    if (!doc) continue;
    docs.push(doc);
    if (docs.length > MAX_TOP_ENTRIES) return docs.map(toEntry);
  }

  // every ranked company also gets its own profile page in the main dataset
  if (docs.length) {
    await DataCompany.init();
    await flushBatch(docs, { inserted: 0, updated: 0, skipped: 0, failed: 0 });
    const stored = await DataCompany.find({ key: { $in: docs.map((d) => d.key) } })
      .select('key slug industrySlug citySlug')
      .lean();
    const byKey = new Map(stored.map((s) => [s.key, s]));
    clearFacetCache();
    return docs.map((d) => toEntry({ ...d, ...(byKey.get(d.key) || {}) }));
  }
  return [];
}

export async function createTopList(req, res) {
  const title = asStr(req.body.title);
  if (!title) return res.status(400).json({ ok: false, message: 'Title is required' });
  if (!req.file) return res.status(400).json({ ok: false, message: 'Upload the top-10 file in field "file".' });

  const entries = await parseEntries(req.file.buffer, req.file.originalname, req.body);
  if (!entries.length) return res.status(400).json({ ok: false, message: 'No valid rows found in file' });
  if (entries.length > MAX_TOP_ENTRIES) {
    return res.status(400).json({ ok: false, message: `A top list can have at most ${MAX_TOP_ENTRIES} companies` });
  }

  const slug = slugify(title);
  if (!slug) return res.status(400).json({ ok: false, message: 'Title must contain letters or numbers' });
  if (await TopList.exists({ slug })) {
    return res.status(409).json({ ok: false, message: 'A list with this title already exists' });
  }
  const list = await TopList.create({ title, slug, description: asStr(req.body.description), entries });
  return res.status(201).json({ ok: true, list });
}

export async function listTopLists(req, res) {
  const lists = await TopList.find().sort({ title: 1 }).lean();
  const summary = lists.map((l) => ({
    _id: l._id,
    title: l.title,
    slug: l.slug,
    description: l.description,
    count: l.entries.length,
    preview: l.entries.slice(0, 3).map((e) => ({ name: e.name, logo: e.logo })),
  }));
  return res.json({ ok: true, lists: summary });
}

export async function getTopList(req, res) {
  const list = await TopList.findOne({ slug: req.params.slug }).lean();
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });

  // profile links are snapshots: drop the ones whose company page no longer exists
  const refs = list.entries
    .map((e) => String(e.profilePath || '').match(/^\/data\/([^/]+)\/([^/]+)\/([^/]+)$/))
    .filter(Boolean)
    .map(([, industrySlug, citySlug, slug]) => ({ industrySlug, citySlug, slug }));
  if (refs.length) {
    const found = await DataCompany.find({ $or: refs }).select('industrySlug citySlug slug').lean();
    const alive = new Set(found.map((d) => profilePath(d)));
    list.entries = list.entries.map((e) => (e.profilePath && !alive.has(e.profilePath) ? { ...e, profilePath: undefined } : e));
  }
  return res.json({ ok: true, list });
}

export async function getTopListById(req, res) {
  const list = await TopList.findById(req.params.id).lean();
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });
  return res.json({ ok: true, list });
}

export async function updateTopList(req, res) {
  const list = await TopList.findById(req.params.id);
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });
  if (req.body.title !== undefined) {
    const title = asStr(req.body.title);
    if (!title) return res.status(400).json({ ok: false, message: 'Title cannot be empty' });
    list.title = title;
  }
  if (req.body.description !== undefined) list.description = asStr(req.body.description);
  await list.save();
  return res.json({ ok: true, list });
}

export async function replaceTopListEntries(req, res) {
  const list = await TopList.findById(req.params.id);
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });
  if (!req.file) return res.status(400).json({ ok: false, message: 'Upload the top-10 file in field "file".' });
  const entries = await parseEntries(req.file.buffer, req.file.originalname, req.body);
  if (!entries.length || entries.length > MAX_TOP_ENTRIES) {
    return res.status(400).json({ ok: false, message: `File must contain 1-${MAX_TOP_ENTRIES} valid companies` });
  }
  list.entries = entries;
  await list.save();
  return res.json({ ok: true, list });
}

/** Body: { order: [entryId, ...] } — full new ranking, must contain exactly the current entries. */
export async function reorderTopList(req, res) {
  const list = await TopList.findById(req.params.id);
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });
  const order = Array.isArray(req.body.order) ? req.body.order.map(String) : [];
  const current = new Map(list.entries.map((e) => [String(e._id), e]));
  const valid = order.length === current.size && new Set(order).size === order.length && order.every((id) => current.has(id));
  if (!valid) return res.status(400).json({ ok: false, message: 'order must list every entry id exactly once' });
  list.entries = order.map((id) => current.get(id));
  await list.save();
  return res.json({ ok: true, list });
}

/** Body: { position: 1-based target rank } — move one entry, shifting the others. */
export async function moveTopListEntry(req, res) {
  const list = await TopList.findById(req.params.id);
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });
  const from = list.entries.findIndex((e) => String(e._id) === req.params.entryId);
  if (from < 0) return res.status(404).json({ ok: false, message: 'Entry not found' });
  const position = asInt(req.body.position);
  if (!position || position < 1 || position > list.entries.length) {
    return res.status(400).json({ ok: false, message: `position must be between 1 and ${list.entries.length}` });
  }
  const [entry] = list.entries.splice(from, 1);
  list.entries.splice(position - 1, 0, entry);
  await list.save();
  return res.json({ ok: true, list });
}

export async function removeTopListEntry(req, res) {
  const list = await TopList.findById(req.params.id);
  if (!list) return res.status(404).json({ ok: false, message: 'List not found' });
  const before = list.entries.length;
  list.entries = list.entries.filter((e) => String(e._id) !== req.params.entryId);
  if (list.entries.length === before) return res.status(404).json({ ok: false, message: 'Entry not found' });
  await list.save();
  return res.json({ ok: true, list });
}

export async function deleteTopList(req, res) {
  const out = await TopList.findByIdAndDelete(req.params.id);
  if (!out) return res.status(404).json({ ok: false, message: 'List not found' });
  return res.json({ ok: true });
}
