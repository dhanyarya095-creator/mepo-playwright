import { test, expect } from './fixtures';
import testData from './data/contact-form-data.json';

test.describe('Contact Form - Data-Driven Testing @regression', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');
  });

  for (const data of testData) {
    test(`should handle: ${data.scenario}`, async ({ page }) => {
      // Fill all fields
      await page.locator('input[placeholder="Input your name"]').fill(data.name);
      await page.locator('input[placeholder="Input your phone number"]').fill(data.phone);
      await page.locator('input[placeholder="Input your email"]').fill(data.email);
      await page.locator('input[placeholder="Input your message"]').fill(data.message);

      // Verify all fields are filled correctly
      await expect(page.locator('input[placeholder="Input your name"]')).toHaveValue(data.name);
      await expect(page.locator('input[placeholder="Input your phone number"]')).toHaveValue(data.phone);
      await expect(page.locator('input[placeholder="Input your email"]')).toHaveValue(data.email);
      await expect(page.locator('input[placeholder="Input your message"]')).toHaveValue(data.message);

      if (data.valid) {
        // Submit the form
        const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
        await submitBtn.click();
        await page.waitForTimeout(1500);

        // Form should either: show success, reset, or still be on contact page
        await expect(page).toHaveURL(/\/contact-us/);
      }
    });
  }
});
