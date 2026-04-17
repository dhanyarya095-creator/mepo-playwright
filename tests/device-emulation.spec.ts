import { test, expect } from './fixtures';

const pages = ['/', '/about', '/products', '/activities', '/contact-us'];

/**
 * Device Emulation Tests @regression
 *
 * These tests run on device-specific projects defined in playwright.config.ts:
 *   - iPhone 14
 *   - Galaxy S5
 *   - iPad Pro 11
 *   - Pixel 7
 *
 * Run with: npm run test:devices
 */
test.describe('Device Emulation Testing @regression', () => {

  test('should load homepage correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Mepo/i);
  });

  test('should have no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const hasOverflow = await page.evaluate(() =>
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasOverflow).toBeFalsy();
  });

  test('should load all pages', async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveTitle(/Mepo/i);
    }
  });

  test('should display logo', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('a[href="/"] img').first()).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await expect(page.locator('footer')).toBeVisible();
  });
});
