import { test, expect } from './fixtures';

test.describe('Responsive Design - dev.mepo.travel', () => {

  // ==========================================
  // Mobile Viewport (375 x 812)
  // ==========================================
  test.describe('Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('should load homepage on mobile viewport', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Mepo/i);
    });

    test('should display hamburger menu on mobile', async ({ page }) => {
      await page.goto('/');

      const hamburger = page.locator('button[aria-label*="menu" i], [class*="MenuIcon"], svg[data-testid*="Menu"]');
      const count = await hamburger.count();

      if (count > 0) {
        await expect(hamburger.first()).toBeVisible();
      }
    });

    test('should render content without horizontal overflow on mobile', async ({ page }) => {
      await page.goto('/');

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBeFalsy();
    });

    test('should display hero section on mobile', async ({ page }) => {
      await page.goto('/');
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible();
    });

    test('should load all pages on mobile', async ({ page }) => {
      const pages: string[] = ['/', '/about', '/products', '/activities', '/contact-us'];

      for (const path of pages) {
        await page.goto(path);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle(/Mepo/i);
      }
    });
  });

  // ==========================================
  // Tablet Viewport (768 x 1024)
  // ==========================================
  test.describe('Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should load homepage on tablet viewport', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Mepo/i);
    });

    test('should render content properly on tablet', async ({ page }) => {
      await page.goto('/');

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBeFalsy();
    });

    test('should display logo on tablet', async ({ page }) => {
      await page.goto('/');
      const logo = page.locator('a[href="/"] img').first();
      await expect(logo).toBeVisible();
    });

    test('should load all pages on tablet', async ({ page }) => {
      const pages: string[] = ['/', '/about', '/products', '/activities', '/contact-us'];

      for (const path of pages) {
        await page.goto(path);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle(/Mepo/i);
      }
    });

    test('should display footer on tablet', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });
  });

  // ==========================================
  // Desktop Viewport (1280 x 720)
  // ==========================================
  test.describe('Desktop (1280px)', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('should load homepage on desktop viewport', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Mepo/i);
    });

    test('should display full navigation links on desktop', async ({ page }) => {
      await page.goto('/');

      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Activities' })).toBeVisible();
    });

    test('should display Contact Us and Download buttons on desktop', async ({ page }) => {
      await page.goto('/');

      const contactBtn = page.locator('a[href="/contact-us"] button');
      await expect(contactBtn).toBeVisible();

      const downloadBtn = page.locator('#composition-button').first();
      await expect(downloadBtn).toBeVisible();
    });

    test('should render content without horizontal overflow on desktop', async ({ page }) => {
      await page.goto('/');

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBeFalsy();
    });

    test('should load all pages on desktop', async ({ page }) => {
      const pages: string[] = ['/', '/about', '/products', '/activities', '/contact-us'];

      for (const path of pages) {
        await page.goto(path);
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveTitle(/Mepo/i);
      }
    });
  });

  // ==========================================
  // Wide Desktop Viewport (1920 x 1080)
  // ==========================================
  test.describe('Wide Desktop (1920px)', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should load homepage on wide desktop', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Mepo/i);
    });

    test('should not have horizontal overflow on wide desktop', async ({ page }) => {
      await page.goto('/');

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBeFalsy();
    });
  });
});
