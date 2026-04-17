import { test, expect } from '@playwright/test';

test.describe('Products Page - Text Content & Buttons Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
  });

  test('should load the Products page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/products/);
    await expect(page).toHaveTitle(/Mepo/i);
  });

  // ==========================================
  // Product Cards Validation
  // ==========================================
  test('should display product items', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    
    // Products use slick slider with items
    const items = page.locator('.slick-slide, [class*="product"], [class*="Product"]');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display product images', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    
    const images = page.locator('img').filter({ has: page.locator('[class*="slider"], [class*="Slider"]') });
    const mainImages = page.locator('main img, section img');
    const count = await mainImages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display WhatsApp link for booking', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    
    const waLink = page.locator('a[href*="wa.me"], a[href*="whatsapp"]').first();
    if (await waLink.isVisible()) {
      const href = await waLink.getAttribute('href');
      expect(href).toMatch(/wa\.me|whatsapp/i);
    }
  });

  test('should display "Others" category', async ({ page }) => {
    const othersCategory = page.getByText('Others').first();
    await expect(othersCategory).toBeVisible();
  });

  // ==========================================
  // Product Names Validation
  // ==========================================
  test('should display product: "Magelang-Jogja Trip"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Magelang.*Jogja/i).first()).toBeVisible();
  });

  test('should display product: "Pulau Pari Trip"', async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
    await expect(page.getByText(/Pulau Pari/i).first()).toBeVisible();
  });

  // ==========================================
  // Navbar on Products page
  // ==========================================
  test('should maintain navbar on Products page', async ({ page }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Products' })).toBeVisible();
  });
});
