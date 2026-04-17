import { test, expect } from './fixtures';

test.describe('Activities Page - Text Content Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/activities');
    await page.waitForLoadState('networkidle');
  });

  test('should load the Activities page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/activities/);
    await expect(page).toHaveTitle(/Mepo/i);
  });

  // ==========================================
  // Headings
  // ==========================================
  test('should display "Our Activities" heading', async ({ page }) => {
    await expect(page.getByText('Our Activities').first()).toBeVisible();
  });

  // ==========================================
  // Article Content Validation
  // ==========================================
  test('should display Innova Community article title', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Innova Community Rayakan HUT ke-19/i).first()).toBeVisible();
  });

  test('should display article location "Yogyakarta"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Yogyakarta/i).first()).toBeVisible();
  });

  test('should display article date info', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/November 2025/i).first()).toBeVisible();
  });

  test('should display "Kopdar Akbar Jawa 2025" text', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Kopdar Akbar Jawa 2025/i).first()).toBeVisible();
  });

  test('should display Mepo partner mention in article', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Mepo/i).first()).toBeVisible();
  });

  // ==========================================
  // Article Images
  // ==========================================
  test('should display article images', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });

  // ==========================================
  // Navbar
  // ==========================================
  test('should maintain navbar on Activities page', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Activities' })).toBeVisible();
  });
});
