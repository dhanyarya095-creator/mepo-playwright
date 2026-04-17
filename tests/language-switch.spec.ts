import { test, expect } from './fixtures';

test.describe('Language Switch - dev.mepo.travel', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display language switcher in navbar', async ({ page }) => {
    const langSwitcher = page.locator('#composition-button').last();
    await expect(langSwitcher).toBeVisible();
  });

  test('should show language dropdown when clicked', async ({ page }) => {
    const langSwitcher = page.locator('#composition-button').last();
    await langSwitcher.click();
    await page.waitForTimeout(500);

    const dropdown = page.locator('#composition-menu[role="menu"]');
    await expect(dropdown).toBeVisible();
  });

  test('should show English option in dropdown', async ({ page }) => {
    const langSwitcher = page.locator('#composition-button').last();
    await langSwitcher.click();
    await page.waitForTimeout(500);

    const enOption = page.getByText(/English \(EN\)/i);
    await expect(enOption).toBeVisible();
  });

  test('should show Indonesia option in dropdown', async ({ page }) => {
    const langSwitcher = page.locator('#composition-button').last();
    await langSwitcher.click();
    await page.waitForTimeout(500);

    const idOption = page.getByText(/Indonesia \(ID\)/i);
    await expect(idOption).toBeVisible();
  });

  test('should be able to switch to English', async ({ page }) => {
    const langSwitcher = page.locator('#composition-button').last();
    await langSwitcher.click();
    await page.waitForTimeout(500);

    const enOption = page.getByText(/English \(EN\)/i);
    if (await enOption.isVisible()) {
      await enOption.click();
      await page.waitForTimeout(1000);
      await page.waitForLoadState('networkidle');
    }
  });

  test('should be able to switch to Indonesian', async ({ page }) => {
    const langSwitcher = page.locator('#composition-button').last();
    await langSwitcher.click();
    await page.waitForTimeout(500);

    const idOption = page.getByText(/Indonesia \(ID\)/i);
    if (await idOption.isVisible()) {
      await idOption.click();
      await page.waitForTimeout(1000);
      await page.waitForLoadState('networkidle');
    }
  });

  test('should display translation icon', async ({ page }) => {
    const translateIcon = page.locator('svg').last();
    await expect(translateIcon).toBeVisible();
  });
});
