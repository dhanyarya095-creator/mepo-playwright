import { test, expect } from './fixtures';

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Activities', path: '/activities' },
  { name: 'Contact Us', path: '/contact-us' },
];

test.describe('Visual Regression Testing @regression', () => {

  for (const p of pages) {
    test(`should match visual snapshot for ${p.name} page`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for animations

      // Take full page screenshot and compare with baseline
      await expect(page).toHaveScreenshot(`${p.name.toLowerCase().replace(/\s/g, '-')}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02, // Allow 2% pixel difference
        threshold: 0.2,
      });
    });
  }

  test('should match navbar visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const navbar = page.getByRole('navigation');
    await expect(navbar).toHaveScreenshot('navbar.png', {
      maxDiffPixelRatio: 0.02,
    });
  });

  test('should match footer visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixelRatio: 0.02,
    });
  });
});
