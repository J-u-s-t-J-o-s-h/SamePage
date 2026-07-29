import { existsSync } from 'node:fs';
import { relative } from 'node:path';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { createApp } from './app';

const { app, config } = createApp();

// In production the API also serves the built web app, so a household runs the
// whole system as a single process on a single port. In development, Vite
// serves the web app and proxies `/api` here.
if (config.isProduction) {
  const root = relative(process.cwd(), config.webDist) || '.';

  if (!existsSync(config.webDist)) {
    console.warn(`[samepage] Web assets not found at ${config.webDist}. Run "pnpm build" first.`);
  }

  // Serve real static files (assets, manifest, icons) when they exist.
  app.use('*', serveStatic({ root }));
  // Single-page-app fallback: any other GET returns index.html.
  app.get('*', serveStatic({ root, path: 'index.html' }));
}

serve({ fetch: app.fetch, port: config.port }, (info) => {
  console.log(`[samepage] listening on http://localhost:${info.port} (${config.nodeEnv})`);
});
