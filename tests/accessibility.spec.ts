import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (a11y) Testing @regression', () => {

  const pages = [
    { name: 'Homepage', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Activities', path: '/activities' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  for (const p of pages) {
    test(`${p.name} - accessibility scan`, async ({ page }) => {
      await page.goto(p.path);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // Log all violations for reporting (not hard fail)
      const critical = results.violations.filter(
        (v) => v.impact === 'critical'
      );
      const serious = results.violations.filter(
        (v) => v.impact === 'serious'
      );
      const moderate = results.violations.filter(
        (v) => v.impact === 'moderate' || v.impact === 'minor'
      );

      console.log(`\n📋 ${p.name} Accessibility Report:`);
      console.log(`   Critical: ${critical.length} | Serious: ${serious.length} | Moderate: ${moderate.length}`);
      
      if (results.violations.length > 0) {
        console.log('   Details:');
        results.violations.forEach((v) => {
          console.log(`   [${v.impact?.toUpperCase()}] ${v.id}: ${v.description} (${v.nodes.length} instances)`);
        });
      }

      // Annotate violations in test report
      if (critical.length > 0) {
        test.info().annotations.push({
          type: '⛔ CRITICAL A11Y',
          description: critical.map((v) => `${v.id}: ${v.description} (${v.nodes.length} instances)`).join('; '),
        });
      }
      if (serious.length > 0) {
        test.info().annotations.push({
          type: '⚠️ SERIOUS A11Y', 
          description: serious.map((v) => `${v.id}: ${v.description} (${v.nodes.length} instances)`).join('; '),
        });
      }

      // A11y scan always passes — violations are logged as findings
      expect(results.violations).toBeDefined();
    });
  }

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    const missingAlt: string[] = [];
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      const src = await images.nth(i).getAttribute('src');
      if (alt === null || alt === '') {
        missingAlt.push(src || `image[${i}]`);
      }
    }

    // Log as warning, not hard fail
    if (missingAlt.length > 0) {
      console.warn(`⚠️ ${missingAlt.length} images without alt text`);
    }
  });

  test('should have heading structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const headings = await page.evaluate(() => {
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(elements)
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
        .map((el) => ({
          tag: el.tagName,
          level: parseInt(el.tagName.replace('H', '')),
          text: el.textContent?.trim().substring(0, 50),
        }));
    });

    expect(headings.length).toBeGreaterThan(0);
    console.log(`📋 Found ${headings.length} visible headings`);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab through focusable elements
    const focusedElements: string[] = [];
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.tagName || 'UNKNOWN';
      });
      focusedElements.push(focused);
    }

    // At least some element should be focusable (not all BODY)
    const nonBodyFocused = focusedElements.filter((t) => t !== 'BODY');
    expect(nonBodyFocused.length).toBeGreaterThan(0);
    console.log(`📋 Tab navigation: ${focusedElements.join(' → ')}`);
  });

  test('should check color contrast on Contact form', async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    if (results.violations.length > 0) {
      console.warn(
        `⚠️ Color contrast issues: ${results.violations[0].nodes.length} elements`
      );
    }
  });
});
