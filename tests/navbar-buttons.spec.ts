import { test, expect } from './fixtures';

test.describe('Navbar Buttons - Contact Us & Download', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ==========================================
  // Contact Us Button Tests
  // ==========================================
  test.describe('Contact Us Button', () => {

    test('should be visible in the navbar', async ({ page }) => {
      const contactBtn = page.locator('a[href="/contact-us"] button');
      await expect(contactBtn).toBeVisible();
    });

    test('should have correct href attribute', async ({ page }) => {
      const contactLink = page.locator('a[href="/contact-us"]');
      await expect(contactLink).toHaveAttribute('href', '/contact-us');
    });

    test('should navigate to /contact-us when clicked', async ({ page }) => {
      await page.locator('a[href="/contact-us"] button').click();
      await expect(page).toHaveURL(/\/contact-us/);
    });

    test('Contact Us page should load after clicking navbar button', async ({ page }) => {
      await page.locator('a[href="/contact-us"] button').click();
      await expect(page).toHaveURL(/\/contact-us/);

      await page.waitForLoadState('networkidle');
      const formInput = page.locator('input[placeholder="Input your name"]');
      await expect(formInput).toBeVisible();
    });
  });

  // ==========================================
  // Download Button Tests
  // ==========================================
  test.describe('Download Button', () => {

    test('should be visible in the navbar', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await expect(downloadBtn).toBeVisible();
      await expect(downloadBtn).toContainText(/Download/i);
    });

    test('should open dropdown menu when clicked', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const dropdown = page.locator('#composition-menu[role="menu"]');
      await expect(dropdown).toBeVisible();
    });

    test('should show App Store option in dropdown', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const appStoreLink = page.locator('a[href*="apps.apple.com"]');
      await expect(appStoreLink.first()).toBeVisible();
    });

    test('should show Google Play option in dropdown', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const googlePlayLink = page.locator('a[href*="play.google.com"]');
      await expect(googlePlayLink.first()).toBeVisible();
    });

    test('should have correct App Store link', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const appStoreLink = page.locator('a[href*="apps.apple.com"]').first();
      await expect(appStoreLink).toHaveAttribute('href', /apps\.apple\.com.*mepo/i);
    });

    test('should have correct Google Play link', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const googlePlayLink = page.locator('a[href*="play.google.com"]').first();
      await expect(googlePlayLink).toHaveAttribute('href', /play\.google\.com.*mepo/i);
    });

    test('should close dropdown when clicking outside', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const dropdown = page.locator('#composition-menu[role="menu"]');
      await expect(dropdown).toBeVisible();

      await page.locator('body').click({ position: { x: 10, y: 400 } });
      await page.waitForTimeout(500);

      await expect(dropdown).not.toBeVisible();
    });

    test('App Store link should open in new tab', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const appStoreLink = page.locator('a[href*="apps.apple.com"]').first();
      const target = await appStoreLink.getAttribute('target');
      expect(target).toBe('_blank');
    });

    test('Google Play link should open in new tab', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await downloadBtn.click();
      await page.waitForTimeout(500);

      const googlePlayLink = page.locator('a[href*="play.google.com"]').first();
      const target = await googlePlayLink.getAttribute('target');
      expect(target).toBe('_blank');
    });
  });
});
