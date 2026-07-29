import { expect, test } from '@playwright/test';

test.describe('SamePage home shell', () => {
  test('loads and shows the product and primary actions', async ({ page }) => {
    await page.goto('/');

    // Brand + headline are present.
    await expect(page.getByRole('heading', { level: 1 })).toContainText('same page', {
      ignoreCase: true,
    });
    await expect(page.getByText('SamePage').first()).toBeVisible();

    // The four primary actions are visible in plain language.
    for (const label of ['Add Something', 'Today', 'What Changed', 'Needs Review']) {
      await expect(page.getByRole('heading', { name: label })).toBeVisible();
    }
  });

  test('reports a healthy connection to the home system', async ({ page }) => {
    await page.goto('/');
    const status = page.getByRole('status');
    await expect(status).toContainText('Connected to your home system', { timeout: 10_000 });
  });

  test('exposes a working health endpoint', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('samepage');
    expect(Array.isArray(body.checks)).toBe(true);
  });

  test('serves the web app manifest for installability', async ({ request }) => {
    const res = await request.get('/manifest.webmanifest');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('SamePage');
    expect(Array.isArray(body.icons)).toBe(true);
  });
});
