import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index.js';
import DataCompany from '../src/model/data/DataCompany.js';
import DataImportJob from '../src/model/data/DataImportJob.js';
import TopList from '../src/model/data/TopList.js';
import { signAccessToken } from '../src/utils/tokens.js';

let mongod;
let adminCookie;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  adminCookie = `accessToken=${signAccessToken({ _id: new mongoose.Types.ObjectId(), role: 'admin' })}`;
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  await Promise.all([DataCompany.deleteMany({}), DataImportJob.deleteMany({}), TopList.deleteMany({})]);
});

describe('origin guard (CSRF)', () => {
  it('blocks writes from an untrusted Origin', async () => {
    const res = await request(app)
      .delete('/api/v1/admin/data/companies')
      .set('Cookie', adminCookie)
      .set('Origin', 'https://evil.example');
    expect(res.status).toBe(403);
    expect(res.body.code).toBe('BAD_ORIGIN');
  });

  it('blocks writes with an untrusted Referer', async () => {
    const res = await request(app)
      .delete('/api/v1/admin/data/companies')
      .set('Cookie', adminCookie)
      .set('Referer', 'https://evil.example/page');
    expect(res.status).toBe(403);
  });

  it('allows writes from a trusted Origin', async () => {
    const res = await request(app)
      .delete('/api/v1/admin/data/companies')
      .set('Cookie', adminCookie)
      .set('Origin', 'http://localhost:3000');
    expect(res.status).toBe(200);
  });
});

describe('active import guards', () => {
  it('rejects delete-all and per-file delete while an import is running', async () => {
    const job = await DataImportJob.create({ filename: 'a.csv', status: 'running' });
    const all = await request(app).delete('/api/v1/admin/data/companies').set('Cookie', adminCookie);
    expect(all.status).toBe(409);

    const done = await DataImportJob.create({ filename: 'b.csv', status: 'completed' });
    const one = await request(app).delete(`/api/v1/admin/data/imports/${done._id}`).set('Cookie', adminCookie);
    expect(one.status).toBe(409);
    expect(job.status).toBe('running');
  });
});

describe('top list profile links', () => {
  it('drops profilePath when the company page no longer exists', async () => {
    await TopList.create({
      title: 'Best',
      slug: 'best',
      entries: [
        { name: 'Gone', rank: 1, profilePath: '/data/software/berlin/gone' },
        { name: 'Here', rank: 2, profilePath: '/data/software/berlin/here' },
      ],
    });
    await DataCompany.create({
      key: 'here.com', name: 'Here', nameLower: 'here', domain: 'here.com', industry: 'Software', industrySlug: 'software',
      city: 'Berlin', citySlug: 'berlin', slug: 'here',
    });
    const res = await request(app).get('/api/v1/data/top-lists/best');
    expect(res.status).toBe(200);
    const byName = Object.fromEntries(res.body.list.entries.map((e) => [e.name, e.profilePath]));
    expect(byName.Gone).toBeUndefined();
    expect(byName.Here).toBe('/data/software/berlin/here');
  });
});

describe('legacy admin user routes', () => {
  it('no longer exposes /users or /user/:id admin endpoints', async () => {
    const res = await request(app).get('/api/v1/users').set('Cookie', adminCookie);
    expect(res.status).toBe(404);
  });
});
