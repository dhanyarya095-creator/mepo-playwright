import { test, expect } from './fixtures';

test.describe('About Page - Text Content Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('should load the About page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/about/);
    await expect(page).toHaveTitle(/Mepo/i);
  });

  // ==========================================
  // Headings
  // ==========================================
  test('should display "About" and "Mepo Indonesia" heading', async ({ page }) => {
    // "About" in h4 exists in both main content and footer, use .first()
    await expect(page.locator('h4').getByText('About').first()).toBeVisible();
    await expect(page.locator('h3').getByText('Mepo Indonesia').first()).toBeVisible();
  });

  test('should display "Our Vision" heading', async ({ page }) => {
    await expect(page.getByText('Our Vision').first()).toBeVisible();
  });

  test('should display "Our Mission" heading', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText('Our Mission').first()).toBeVisible();
  });

  // ==========================================
  // Mission Items
  // ==========================================
  test('should display mission: "Empowering Exploration"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await expect(page.getByText('Empowering Exploration').first()).toBeVisible();
  });

  test('should display mission: "Curating Inspiring Content"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(500);
    await expect(page.getByText('Curating Inspiring Content').first()).toBeVisible();
  });

  test('should display mission: "Facilitating Authentic Connections"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(page.getByText('Facilitating Authentic Connections').first()).toBeVisible();
  });

  test('should display mission: "Enabling Sustainable Travel"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);
    await expect(page.getByText('Enabling Sustainable Travel').first()).toBeVisible();
  });

  test('should display mission: "Promoting Cultural Exchange"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);
    await expect(page.getByText('Promoting Cultural Exchange').first()).toBeVisible();
  });

  test('should display mission: "Embracing Innovation"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(500);
    await expect(page.getByText('Embracing Innovation').first()).toBeVisible();
  });

  // ==========================================
  // Navbar on About page
  // ==========================================
  test('should maintain navbar on About page', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
  });

  // ==========================================
  // Footer on About page
  // ==========================================
  test('should display footer on About page', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
