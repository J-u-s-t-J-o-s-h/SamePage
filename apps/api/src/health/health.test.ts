import { describe, expect, it } from 'vitest';
import { buildHealthReport, rollUpStatus } from './health';

describe('rollUpStatus', () => {
  it('returns ok when all checks are ok', () => {
    expect(
      rollUpStatus([
        { name: 'a', status: 'ok' },
        { name: 'b', status: 'ok' },
      ]),
    ).toBe('ok');
  });

  it('returns degraded when any check is degraded but none are down', () => {
    expect(
      rollUpStatus([
        { name: 'a', status: 'ok' },
        { name: 'b', status: 'degraded' },
      ]),
    ).toBe('degraded');
  });

  it('returns down when any check is down (worst wins over degraded)', () => {
    expect(
      rollUpStatus([
        { name: 'a', status: 'degraded' },
        { name: 'b', status: 'down' },
      ]),
    ).toBe('down');
  });
});

describe('buildHealthReport', () => {
  const now = new Date('2026-07-27T12:00:00.000Z');

  it('produces a deterministic, structured report', () => {
    const report = buildHealthReport({
      version: '1.2.3',
      environment: 'test',
      now,
      uptimeSeconds: 42.6,
    });

    expect(report).toEqual({
      status: 'ok',
      service: 'samepage',
      version: '1.2.3',
      environment: 'test',
      timestamp: '2026-07-27T12:00:00.000Z',
      uptimeSeconds: 43,
      checks: [{ name: 'process', status: 'ok' }],
    });
  });

  it('never reports negative uptime', () => {
    const report = buildHealthReport({ version: '1.0.0', environment: 'test', uptimeSeconds: -5 });
    expect(report.uptimeSeconds).toBe(0);
  });

  it('reflects the worst check in the overall status', () => {
    const report = buildHealthReport({
      version: '1.0.0',
      environment: 'test',
      checks: [
        { name: 'process', status: 'ok' },
        { name: 'database', status: 'down', detail: 'not configured yet' },
      ],
    });
    expect(report.status).toBe('down');
  });
});
