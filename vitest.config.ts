import { defineConfig } from 'vitest/config';

/**
 * Root Vitest configuration.
 *
 * Unit and integration tests live next to the code they cover as
 * `*.test.ts` / `*.test.tsx` files. Phase 0 tests run in the Node
 * environment; a jsdom project for React component tests is introduced in a
 * later phase when components carry logic worth unit-testing (Playwright
 * covers the rendered UI until then).
 */
export default defineConfig({
  test: {
    include: ['apps/*/src/**/*.test.{ts,tsx}'],
    environment: 'node',
    reporters: 'default',
  },
});
