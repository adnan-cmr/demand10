import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index.js';
import DataCompany from '../src/model/data/DataCompany.js';
import { signAccessToken } from '../src/utils/tokens.js';

let mongod;
let adminCookie;

const tsvRow = (name, domain, industry, city, country = 'Denmark', employees = 5) =>
  [
    name, domain, employees, industry, domain, 'https://img.example/logo.png', `http://www.linkedin.com/company/${domain}`, '', '',
    '1 Main St', city, 'Region', country, '2500', `1 Main St, ${city}`, 'a, b, c', '', 'Gmail, Hubspot',
    '8742', '54161', 'A "quoted" description', '2023', '',
  ].join('\t');

const waitForJob = async (id) => {
  for (let i = 0; i < 100; i++) {
    const res = await request(app).get(`/api/v1/admin/data/imports/${id}`).set('Cookie', adminCookie);
    if (res.body.job.status !== 'running') return res.body.job;
    await new Promise((r) => setTimeout(r, 100));
  }
  throw new Error('import timeout');
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  adminCookie = `accessToken=${signAccessToken({ _id: new mongoose.Types.ObjectId(), role: 'admin' })}`;
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('data import + browse', () => {
  it('requires admin to import', async () => {
    const res = await request(app).post('/api/v1/admin/data/import');
    expect(res.status).toBe(401);
  });

  it('imports a TSV, dedupes, disambiguates slugs and serves it', async () => {
    const body = [
      tsvRow('Dilution.io', 'dilution.io', 'information technology & services', 'Copenhagen'),
      tsvRow('Acme', 'acme.com', 'Software', 'Berlin', 'Germany', 50),
      tsvRow('Acme', 'acme.org', 'Software', 'Berlin', 'Germany', 80), // same slug, different domain
      tsvRow('Acme Dup', 'acme.com', 'Software', 'Berlin', 'Germany', 60), // same key -> update
    ].join('\n');

    const up = await request(app)
      .post('/api/v1/admin/data/import')
      .set('Cookie', adminCookie)
      .attach('file', Buffer.from(body), 'companies.tsv');
    expect(up.status).toBe(202);

    const job = await waitForJob(up.body.jobId);
    expect(job.status).toBe('completed');
    expect(job.processed).toBe(4);
    expect(job.failed).toBe(0);
    expect(await DataCompany.countDocuments()).toBe(3);

    const page = await request(app).get('/api/v1/data/companies?limit=2');
    expect(page.body.companies).toHaveLength(2);
    expect(page.body.nextCursor).toBeTruthy();
    const page2 = await request(app).get(`/api/v1/data/companies?limit=2&after=${page.body.nextCursor}`);
    expect(page2.body.companies).toHaveLength(1);
    expect(page2.body.nextCursor).toBeNull();

    const byName = await request(app).get('/api/v1/data/companies?q=dil');
    expect(byName.body.companies.map((c) => c.name)).toEqual(['Dilution.io']);

    const filtered = await request(app).get('/api/v1/data/companies?industry=software&employeesMin=70');
    expect(filtered.body.companies).toHaveLength(1);

    const detail = await request(app).get('/api/v1/data/companies/information-technology-and-services/copenhagen/dilution-io');
    expect(detail.status).toBe(200);
    expect(detail.body.company.keywords).toEqual(['a', 'b', 'c']);
    expect(detail.body.company.foundedYear).toBe(2023);

    const facets = await request(app).get('/api/v1/data/facets?country=germany');
    expect(facets.body.industries.length).toBe(2);
    expect(facets.body.cities[0].slug).toBe('berlin');
  });

  it('merges descriptions wrapped over several lines and drops stray fragments', async () => {
    const header = ['Company', '# Employees', 'Industry', 'Website', 'Company Linkedin Url', 'City', 'Country', 'Short Description', 'Founded Year'].join('\t');
    const body = [
      header,
      ['Wrap Co', '4', 'Software', 'wrap.io', 'https://www.linkedin.com/company/wrap-co', 'Sofia', 'Bulgaria', 'First line of text', '2019'].join('\t').replace('First line of text', 'First line of text\nsecond line\twith tail').replace('\t2019', '') + '\t2019',
      'orphan fragment',
    ].join('\n');
    const up = await request(app).post('/api/v1/admin/data/import').set('Cookie', adminCookie)
      .attach('file', Buffer.from(body), 'wrap.tsv');
    await waitForJob(up.body.jobId);
    const docs = await DataCompany.find({ linkedinId: 'wrap-co' }).lean();
    expect(docs).toHaveLength(1);
    expect(await DataCompany.countDocuments({ nameLower: /orphan|second/ })).toBe(0);
  });

  it('accepts CSV and Excel, upserts on LinkedIn id and deletes by file', async () => {
    const header = ['Company', 'Company Name for Emails', '# Employees', 'Industry', 'Website', 'Logo Url', 'Company Linkedin Url', 'City', 'Country', 'Keywords', 'Short Description'];
    const rowFor = (emp, desc) => ['Zeta, Inc', 'Zeta', emp, 'Software', 'zeta.io', '', 'https://www.linkedin.com/company/zeta-inc/', 'Oslo', 'Norway', 'cloud, backup', desc];

    const csvText = [header, rowFor(10, 'Old ðŸŸ€ text')]
      .map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const up1 = await request(app).post('/api/v1/admin/data/import').set('Cookie', adminCookie)
      .attach('file', Buffer.from(csvText), 'zeta.csv');
    const job1 = await waitForJob(up1.body.jobId);
    expect(job1.inserted).toBe(1);

    const XLSX = (await import('xlsx')).default;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([header, rowFor(99, 'New text')]), 'Sheet1');
    const xlsx = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    for (let i = 0; i < 2; i++) {
      const up = await request(app).post('/api/v1/admin/data/import').set('Cookie', adminCookie)
        .attach('file', xlsx, 'zeta.xlsx');
      expect((await waitForJob(up.body.jobId)).status).toBe('completed');
    }

    const docs = await DataCompany.find({ linkedinId: 'zeta-inc' }).lean();
    expect(docs).toHaveLength(1);
    expect(docs[0].employees).toBe(99);
    expect(docs[0].description).toBe('New text');
    expect(docs[0].name).toBe('Zeta, Inc');

    const jobs = (await request(app).get('/api/v1/admin/data/imports').set('Cookie', adminCookie)).body.jobs;
    const onlyJob = jobs.find((j) => j._id === up1.body.jobId);
    // deleting the first file keeps the record (still linked to later files)
    expect((await request(app).delete(`/api/v1/admin/data/imports/${onlyJob._id}`).set('Cookie', adminCookie)).status).toBe(202);
    await new Promise((r) => setTimeout(r, 300));
    expect(await DataCompany.countDocuments({ linkedinId: 'zeta-inc' })).toBe(1);

    for (const j of jobs.filter((x) => x.filename === 'zeta.xlsx')) {
      await request(app).delete(`/api/v1/admin/data/imports/${j._id}`).set('Cookie', adminCookie);
      await new Promise((r) => setTimeout(r, 300));
    }
    expect(await DataCompany.countDocuments({ linkedinId: 'zeta-inc' })).toBe(0);
  });
});

describe('top lists', () => {
  const file = [1, 2, 3].map((i) => tsvRow(`Co ${i}`, `co${i}.com`, 'Software', 'Berlin')).join('\n');
  let list;

  it('creates a list from a file', async () => {
    const res = await request(app)
      .post('/api/v1/admin/data/top-lists')
      .set('Cookie', adminCookie)
      .field('title', 'Best CRM')
      .attach('file', Buffer.from(file), 'top.tsv');
    expect(res.status).toBe(201);
    list = res.body.list;
    expect(list.entries.map((e) => e.name)).toEqual(['Co 1', 'Co 2', 'Co 3']);
    expect(await DataCompany.countDocuments({ domain: 'co1.com' })).toBe(1);
    const p = list.entries[0].profilePath;
    expect((await request(app).get(`/api/v1${p.replace('/data/', '/data/companies/')}`)).status).toBe(200);
  });

  it('rejects more than 10 rows', async () => {
    const big = Array.from({ length: 11 }, (_, i) => tsvRow(`B ${i}`, `b${i}.com`, 'X', 'Y')).join('\n');
    const res = await request(app)
      .post('/api/v1/admin/data/top-lists')
      .set('Cookie', adminCookie)
      .field('title', 'Too big')
      .attach('file', Buffer.from(big), 'top.tsv');
    expect(res.status).toBe(400);
  });

  it('moves 3rd entry to first, then reorders', async () => {
    const third = list.entries[2]._id;
    const moved = await request(app)
      .put(`/api/v1/admin/data/top-lists/${list._id}/entries/${third}/move`)
      .set('Cookie', adminCookie)
      .send({ position: 1 });
    expect(moved.body.list.entries.map((e) => e.name)).toEqual(['Co 3', 'Co 1', 'Co 2']);

    const ids = moved.body.list.entries.map((e) => e._id).reverse();
    const re = await request(app)
      .put(`/api/v1/admin/data/top-lists/${list._id}/reorder`)
      .set('Cookie', adminCookie)
      .send({ order: ids });
    expect(re.body.list.entries.map((e) => e.name)).toEqual(['Co 2', 'Co 1', 'Co 3']);

    const bad = await request(app)
      .put(`/api/v1/admin/data/top-lists/${list._id}/reorder`)
      .set('Cookie', adminCookie)
      .send({ order: ids.slice(1) });
    expect(bad.status).toBe(400);
  });

  it('is visible publicly in saved order', async () => {
    const index = await request(app).get('/api/v1/data/top-lists');
    expect(index.body.lists[0].count).toBe(3);
    const one = await request(app).get('/api/v1/data/top-lists/best-crm');
    expect(one.body.list.entries[0].name).toBe('Co 2');
  });
});
