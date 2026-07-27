import { describe, expect, it } from 'vitest';
import { createApp } from '../app';
import type { AppConfig } from '../config';

const testConfig: AppConfig = {
  nodeEnv: 'test',
  port: 8787,
  webDist: '/tmp/does-not-matter',
  appVersion: '9.9.9',
  isProduction: false,
};

describe('GET /api/health', () => {
  it('returns 200 with a structured, ok report', async () => {
    const { app } = createApp({ config: testConfig, startedAt: Date.now() });
    const res = await app.request('/api/health');

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('application/json');

    const body = (await res.json()) as Record<string, unknown>;
    expect(body.status).toBe('ok');
    expect(body.service).toBe('samepage');
    expect(body.version).toBe('9.9.9');
    expect(body.environment).toBe('test');
    expect(Array.isArray(body.checks)).toBe(true);
    expect(typeof body.timestamp).toBe('string');
  });

  it('applies security headers', async () => {
    const { app } = createApp({ config: testConfig, startedAt: Date.now() });
    const res = await app.request('/api/health');
    // hono/secure-headers sets these by default.
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
  });

  it('returns 404 for an unknown API route', async () => {
    const { app } = createApp({ config: testConfig, startedAt: Date.now() });
    const res = await app.request('/api/nope');
    expect(res.status).toBe(404);
  });
});
