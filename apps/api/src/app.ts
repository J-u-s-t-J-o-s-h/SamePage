import { Hono } from 'hono';
import { secureHeaders } from 'hono/secure-headers';
import { loadConfig, type AppConfig } from './config';
import { registerHealthRoutes } from './routes/health';

export interface CreateAppOptions {
  config?: AppConfig;
  /** Epoch milliseconds when the server started (defaults to now). */
  startedAt?: number;
  now?: () => Date;
}

export interface CreatedApp {
  app: Hono;
  config: AppConfig;
  startedAt: number;
}

/**
 * Build the Hono application (runtime-agnostic: no Node-only APIs here so it
 * stays easy to test via `app.request(...)`). Static asset serving for the
 * built web app lives in `index.ts`, the Node server entry point.
 */
export function createApp(options: CreateAppOptions = {}): CreatedApp {
  const config = options.config ?? loadConfig();
  const startedAt = options.startedAt ?? Date.now();

  const app = new Hono();
  app.use('*', secureHeaders());

  const api = new Hono();
  registerHealthRoutes(api, { config, startedAt, now: options.now });
  app.route('/api', api);

  return { app, config, startedAt };
}
