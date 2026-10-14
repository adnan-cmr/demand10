import request from 'supertest';
import app from '../src/index.js';

describe('authentication validation', () => {
  it('rejects malformed login payloads before controller execution', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'not-an-email', password: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.message).toBe('Request validation failed');
  });

  it('returns a request id for rejected requests', async () => {
    const response = await request(app).get('/api/v1/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.headers['x-request-id']).toBeDefined();
  });
});
