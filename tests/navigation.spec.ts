import { test, expect } from '@playwright/test';

test.describe('Navigation - dev.mepo.travel', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Home page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate to About page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/\/about/);

    const heading = page.getByText(/about/i).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Products page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Products' }).click();
    await expect(page).toHaveURL(/\/products/);

    const heading = page.getByText(/products/i).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Activities page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Activities' }).click();
    await expect(page).toHaveURL(/\/activities/);

    const heading = page.getByText(/activities/i).first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Contact Us page via nav button', async ({ page }) => {
    await page.locator('a[href="/contact-us"] button').click();
    await expect(page).toHaveURL(/\/contact-us/);
  });

  test('should navigate back to Home from About page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);

    await page.getByRole('navigation').getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('should navigate between all pages sequentially', async ({ page }) => {
    const pages: { name: string; path: string }[] = [
      { name: 'About', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Activities', path: '/activities' },
    ];

    for (const p of pages) {
      await page.getByRole('navigation').getByRole('link', { name: p.name }).click();
      await expect(page).toHaveURL(new RegExp(p.path));
      await page.waitForLoadState('networkidle');
    }
  });

  test('should keep navbar visible on all pages', async ({ page }) => {
    const paths: string[] = ['/', '/about', '/products', '/activities', '/contact-us'];

    for (const path of paths) {
      await page.goto(path);
      const navbar = page.locator('a[href="/"] img').first();
      await expect(navbar).toBeVisible();
    }
  });

  test('should navigate to Home by clicking Mepo logo', async ({ page }) => {
    await page.goto('/about');

    const logo = page.locator('a[href="/"] img').first();
    await logo.click();

    await expect(page).toHaveURL(/\/(#.*)?$/);
  });
});
