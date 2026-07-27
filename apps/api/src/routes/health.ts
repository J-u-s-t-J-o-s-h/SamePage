import type { Hono } from 'hono';
import type { AppConfig } from '../config';
import { buildHealthReport } from '../health/health';

export interface HealthRouteDeps {
  config: AppConfig;
  /** Epoch milliseconds when the server started, for uptime. */
  startedAt: number;
  /** Injectable clock (tests). */
  now?: () => Date;
}

/** Register GET /health on the given router. */
export function registerHealthRoutes(router: Hono, deps: HealthRouteDeps): void {
  router.get('/health', (c) => {
    const now = deps.now ? deps.now() : new Date();
    const report = buildHealthReport({
      version: deps.config.appVersion,
      environment: deps.config.nodeEnv,
      now,
      uptimeSeconds: (now.getTime() - deps.startedAt) / 1000,
      checks: [{ name: 'process', status: 'ok' }],
    });
    return c.json(report);
  });
}
