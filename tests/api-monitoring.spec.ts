import { test, expect } from './fixtures';

test.describe('API Response Monitoring @regression', () => {

  const pages = ['/', '/about', '/products', '/activities', '/contact-us'];

  for (const path of pages) {
    test(`should have no server errors (5xx) on ${path}`, async ({ page }) => {
      const serverErrors: string[] = [];

      page.on('response', (response) => {
        if (response.status() >= 500) {
          serverErrors.push(`${response.status()} - ${response.url()}`);
        }
      });

      await page.goto(path);
      await page.waitForLoadState('networkidle');

      expect(serverErrors, `Server errors found: ${serverErrors.join(', ')}`).toHaveLength(0);
    });

    test(`should have no console errors on ${path}`, async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // Filter out common benign errors (e.g., favicon, third-party scripts)
      const criticalErrors = consoleErrors.filter(
        (err) => !err.includes('favicon') && !err.includes('third-party')
      );

      expect(criticalErrors, `Console errors: ${criticalErrors.join(', ')}`).toHaveLength(0);
    });
  }

  test('should load all images without 404 errors', async ({ page }) => {
    const brokenImages: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      if (
        (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') ||
         url.endsWith('.webp') || url.endsWith('.svg') || url.endsWith('.gif')) &&
        response.status() === 404
      ) {
        brokenImages.push(url);
      }
    });

    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);

    expect(brokenImages, `Broken images: ${brokenImages.join(', ')}`).toHaveLength(0);
  });

  test('should have page load time under 5 seconds', async ({ page }) => {
    const pages = ['/', '/about', '/products', '/activities', '/contact-us'];

    for (const path of pages) {
      const start = Date.now();
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - start;

      expect(loadTime, `${path} loaded in ${loadTime}ms`).toBeLessThan(5000);
    }
  });

  test('should have all API responses within 5 seconds', async ({ page }) => {
    const slowRequests: string[] = [];

    page.on('response', async (response) => {
      const timing = response.request().timing();
      const totalTime = timing.responseEnd;
      if (totalTime > 5000) {
        slowRequests.push(`${response.url()} (${Math.round(totalTime)}ms)`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(slowRequests, `Slow requests: ${slowRequests.join(', ')}`).toHaveLength(0);
  });
});
