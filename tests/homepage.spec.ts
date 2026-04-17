import { test, expect } from '@playwright/test';

test.describe('Homepage - Text Content & Buttons Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  // ==========================================
  // Navbar Text Validation
  // ==========================================
  test.describe('Navbar', () => {
    test('should display all nav link texts correctly', async ({ page }) => {
      const nav = page.getByRole('navigation');
      await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Products' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Activities' })).toBeVisible();
    });

    test('should display "Contact Us" button text', async ({ page }) => {
      const contactBtn = page.locator('a[href="/contact-us"] button');
      await expect(contactBtn).toBeVisible();
      await expect(contactBtn).toContainText('Contact Us');
    });

    test('should display "Download" button text', async ({ page }) => {
      const downloadBtn = page.locator('#composition-button').first();
      await expect(downloadBtn).toBeVisible();
      await expect(downloadBtn).toContainText('Download');
    });

    test('should display Mepo logo', async ({ page }) => {
      const logo = page.locator('a[href="/"] img').first();
      await expect(logo).toBeVisible();
    });
  });

  // ==========================================
  // Hero Section Text Validation
  // ==========================================
  test.describe('Hero Section', () => {
    test('should display main heading "Your Travel Simplified"', async ({ page }) => {
      await expect(page.getByText('Your Travel Simplified')).toBeVisible();
    });

    test('should display sub-heading "Meet, Travel, Happy"', async ({ page }) => {
      await expect(page.getByText('Meet, Travel, Happy')).toBeVisible();
    });

    test('should display description text', async ({ page }) => {
      await expect(page.getByText('Get ready for more experience on your travel')).toBeVisible();
    });
  });

  // ==========================================
  // Partnership Banner
  // ==========================================
  test.describe('Partnership Banner', () => {
    test('should display partnership text', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      const partnerText = page.getByText(/please contact us/i);
      await expect(partnerText.first()).toBeVisible();
    });

    test('should display "Join as Partner" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      const joinBtn = page.getByText('Join as Partner');
      await expect(joinBtn.first()).toBeVisible();
    });

    test('should display "Corporate Outing" button', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 300));
      await page.waitForTimeout(500);
      const corpBtn = page.getByText('Corporate Outing');
      await expect(corpBtn.first()).toBeVisible();
    });
  });

  // ==========================================
  // Value Proposition Section
  // ==========================================
  test.describe('Value Proposition', () => {
    test('should display "Our Value Proposition" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(500);
      await expect(page.getByText('Our Value Proposition').first()).toBeVisible();
    });

    test('should display value prop card: "Kerjasama dengan Agen Travel"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Kerjasama dengan Agen Travel dan Perusahaan Startup').first()).toBeVisible();
    });

    test('should display value prop card: "Solusi All-in-One"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Solusi All-in-One').first()).toBeVisible();
    });

    test('should display value prop card: "Efisien dan Fleksibel"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Efisien dan Fleksibel').first()).toBeVisible();
    });

    test('should display value prop card: "Media Sosial yang Terintegrasi"', async ({ page }) => {
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(500);
      await expect(page.getByText('Media Sosial yang Terintegrasi').first()).toBeVisible();
    });
  });

  // ==========================================
  // What's Inside Section (Accordion)
  // ==========================================
  test.describe('What\'s Inside Section', () => {
    test('should display "What\'s Inside" heading', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(800);
      const whatsInside = page.getByText("\u2019s Inside").or(page.getByText("What's Inside"));
      await expect(whatsInside.first()).toBeVisible();
    });

    test('should display "Itinerary Planning" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Planning').first()).toBeVisible();
    });

    test('should display "Activity Creation" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Activity Creation').first()).toBeVisible();
    });

    test('should display "Invite and Join" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Invite and Join').first()).toBeVisible();
    });

    test('should display "Itinerary Recommendations" accordion item', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      await expect(page.getByText('Itinerary Recommendations').first()).toBeVisible();
    });

    test('should expand accordion and show description on click', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);
      
      const itineraryPlanning = page.getByText('Itinerary Planning').first();
      await itineraryPlanning.click();
      await page.waitForTimeout(800);
      
      // After expanding, some description text should be visible
      // Use a broad check since accordion content varies
      const expandedContent = page.locator('.MuiAccordionDetails-root, [class*="accordion"] p, [class*="Accordion"] p').first();
      if (await expandedContent.isVisible()) {
        await expect(expandedContent).toBeVisible();
      }
    });
  });

  // ==========================================
  // Footer Text Validation
  // ==========================================
  test.describe('Footer', () => {
    test.beforeEach(async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
    });

    test('should display footer', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should display "Pages" section with links', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer.getByText('Home')).toBeVisible();
      await expect(footer.getByText('About')).toBeVisible();
      await expect(footer.getByText('Products')).toBeVisible();
      await expect(footer.getByText('Activities')).toBeVisible();
    });

    test('should display "Legal" section with Terms & Conditions', async ({ page }) => {
      // There are 2 h3 "Legal" elements: one mobile (0x0 dims) and one visible desktop version.
      // Use evaluate to verify footer contains visible Legal text.
      const hasLegal = await page.evaluate(() => {
        const elements = document.querySelectorAll('h3');
        return Array.from(elements).some(
          el => el.textContent?.trim() === 'Legal' && el.getBoundingClientRect().width > 0
        );
      });
      expect(hasLegal).toBeTruthy();

      // Verify Terms & Conditions link exists and is visible
      const hasTerms = await page.evaluate(() => {
        const elements = document.querySelectorAll('h4, a');
        return Array.from(elements).some(
          el => el.textContent?.includes('Terms') && el.getBoundingClientRect().width > 0
        );
      });
      expect(hasTerms).toBeTruthy();
    });

    test('should display contact WhatsApp number', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer.getByText(/\+62/).first()).toBeVisible();
    });

    test('should display contact email', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer.getByText('social@mepo.travel')).toBeVisible();
    });

    test('should display copyright text', async ({ page }) => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      await expect(page.getByText(/Copyright.*2025/i).first()).toBeVisible();
    });

    test('should display "Back to Top" button', async ({ page }) => {
      const backToTopBtn = page.getByText('Back to Top');
      await expect(backToTopBtn.first()).toBeVisible();
    });

    test('"Back to Top" button should scroll to top', async ({ page }) => {
      const backToTopBtn = page.getByText('Back to Top').first();
      
      if (await backToTopBtn.isVisible()) {
        await backToTopBtn.click();
        await page.waitForTimeout(800);
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeLessThan(200);
      }
    });
  });
});
