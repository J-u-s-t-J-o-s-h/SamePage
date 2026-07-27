import { expect, test } from "@playwright/test";

test("home page shows SamePage brand", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "SamePage" })).toBeVisible();
  await expect(
    page.getByText("Application shell is running", { exact: true }),
  ).toBeVisible();
});

test("health endpoint returns ok JSON", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.status).toBe("ok");
  expect(body.service).toBe("samepage");
  expect(body.checks.app).toBe("ok");
});
