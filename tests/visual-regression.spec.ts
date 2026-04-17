import { test, expect } from './fixtures';

const pages = [
  { name: 'Homepage', path: '/', maxDiff: 0.02 },
  { name: 'About', path: '/about', maxDiff: 0.02 },
  { name: 'Products', path: '/products', maxDiff: 0.05 },  // Slick slider is dynamic
  { name: 'Activities', path: '/activities', maxDiff: 0.02 },
  { name: 'Contact Us', path: '/contact-us', maxDiff: 0.02 },
];

test.describe('Visual Regression Testing @regression', () => {

  for (const p of pages) {
    test(`should match visual snapshot for ${p.name} page`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000); // Wait for animations/sliders to settle

      await expect(page).toHaveScreenshot(`${p.name.toLowerCase().replace(/\s/g, '-')}.png`, {
        fullPage: true,
        maxDiffPixelRatio: p.maxDiff,
        threshold: 0.3,
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
    await page.waitForTimeout(2000);

    const footer = page.locator('footer');
    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixelRatio: 0.05,
      threshold: 0.3,
    });
  });
});
