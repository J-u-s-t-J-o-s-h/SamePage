import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const here = dirname(fileURLToPath(import.meta.url));

/** Read the product version from the repo root package.json (best effort). */
function readRootVersion(): string {
  try {
    const pkgPath = resolve(here, '../../../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as { version?: string };
    return pkg.version ?? '0.0.0';
  } catch {
    return '0.0.0';
  }
}

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().max(65535).default(8787),
  WEB_DIST: z.string().min(1).optional(),
  APP_VERSION: z.string().min(1).optional(),
});

export interface AppConfig {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  /** Absolute path to the built web assets served in production. */
  webDist: string;
  appVersion: string;
  isProduction: boolean;
}

/**
 * Load and validate configuration from the environment. SamePage runs with
 * zero configuration: every value has a safe local-first default.
 */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsed = EnvSchema.parse(env);
  return {
    nodeEnv: parsed.NODE_ENV,
    port: parsed.PORT,
    webDist: parsed.WEB_DIST
      ? resolve(process.cwd(), parsed.WEB_DIST)
      : resolve(process.cwd(), 'apps/web/dist'),
    appVersion: parsed.APP_VERSION ?? readRootVersion(),
    isProduction: parsed.NODE_ENV === 'production',
  };
}
