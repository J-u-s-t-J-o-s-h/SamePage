import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end test configuration.
 *
 * The e2e suite exercises the *production* topology: the web app is built to
 * static assets and served by the API on a single port (`pnpm e2e:server`),
 * which mirrors how a household runs SamePage on its home server.
 *
 * Browser selection is robust across environments: if a pre-installed Chromium
 * exists (as in the hosted dev container), we point Playwright at it so the
 * suite never re-downloads browsers; otherwise Playwright uses the browser it
 * manages itself (`playwright install chromium`), as in ordinary CI.
 */
const PORT = 8788;
const BASE_URL = `http://localhost:${PORT}`;

const preinstalledChromium = process.env.PLAYWRIGHT_CHROMIUM_PATH ?? '/opt/pw-browsers/chromium';
const launchOptions = existsSync(preinstalledChromium)
  ? { executablePath: preinstalledChromium }
  : {};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions,
      },
    },
  ],
  webServer: {
    command: 'pnpm run e2e:server',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
