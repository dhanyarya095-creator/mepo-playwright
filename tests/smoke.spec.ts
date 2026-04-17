import { test, expect } from './fixtures';

/**
 * Smoke Test Suite @smoke
 * 
 * Quick sanity checks for the most critical flows.
 * Run with: npm run test:smoke
 */
test.describe('Smoke Tests @smoke @critical', () => {

  test('all pages should load successfully', async ({ page }) => {
    const pages = ['/', '/about', '/products', '/activities', '/contact-us'];

    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(/Mepo/i);
    }
  });

  test('navbar should be functional', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Logo visible
    await expect(page.locator('a[href="/"] img').first()).toBeVisible();

    // Nav links visible
    const nav = page.getByRole('navigation');
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Activities' })).toBeVisible();

    // Contact Us button
    await expect(page.locator('a[href="/contact-us"] button')).toBeVisible();

    // Download button
    await expect(page.locator('#composition-button').first()).toBeVisible();
  });

  test('navigation should work between all pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to About
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);

    // Navigate to Products
    await page.getByRole('navigation').getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL(/\/products/);

    // Navigate to Activities
    await page.getByRole('navigation').getByRole('link', { name: 'Activities' }).click();
    await expect(page).toHaveURL(/\/activities/);

    // Navigate to Contact Us
    await page.locator('a[href="/contact-us"] button').click();
    await expect(page).toHaveURL(/\/contact-us/);

    // Navigate back to Home
    await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('contact form should be submittable with valid data', async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');

    // Fill form with valid data
    await page.locator('input[placeholder="Input your name"]').fill('Smoke Test User');
    await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
    await page.locator('input[placeholder="Input your email"]').fill('smoke@test.com');
    await page.locator('input[placeholder="Input your message"]').fill('Automated smoke test.');

    // Submit
    const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    await page.waitForTimeout(1500);
  });

  test('hero section should be visible on homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Your Travel Simplified')).toBeVisible();
    await expect(page.getByText('Meet, Travel, Happy')).toBeVisible();
  });

  test('footer should be visible and contain key info', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('social@mepo.travel')).toBeVisible();
  });
});
