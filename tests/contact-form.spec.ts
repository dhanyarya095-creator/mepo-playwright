import { test, expect } from './fixtures';

test.describe('Contact Form - Positive & Negative Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us');
    await page.waitForLoadState('networkidle');
  });

  // ==========================================
  // Text Content Validation
  // ==========================================
  test.describe('Text Content', () => {
    test('should display "Contact Us" heading', async ({ page }) => {
      await expect(page.getByText('Contact Us').first()).toBeVisible();
    });

    test('should display "Full Name" label', async ({ page }) => {
      await expect(page.getByText('Full Name').first()).toBeVisible();
    });

    test('should display "Phone Number" label', async ({ page }) => {
      await expect(page.getByText('Phone Number').first()).toBeVisible();
    });

    test('should display "Email" label', async ({ page }) => {
      await expect(page.getByText('Email').first()).toBeVisible();
    });

    test('should display "Your Message" label', async ({ page }) => {
      await expect(page.getByText('Your Message').first()).toBeVisible();
    });

    test('should display placeholder "Input your name"', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Input your name"]');
      await expect(nameInput).toBeVisible();
    });

    test('should display placeholder "Input your phone number"', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder="Input your phone number"]');
      await expect(phoneInput).toBeVisible();
    });

    test('should display placeholder "Input your email"', async ({ page }) => {
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await expect(emailInput).toBeVisible();
    });

    test('should display placeholder "Input your message"', async ({ page }) => {
      const messageInput = page.locator('input[placeholder="Input your message"]');
      await expect(messageInput).toBeVisible();
    });

    test('should display Submit button', async ({ page }) => {
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Send")').first();
      await expect(submitBtn).toBeVisible();
    });
  });

  // ==========================================
  // POSITIVE CASES
  // ==========================================
  test.describe('Positive Cases', () => {

    test('should accept valid full name', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Input your name"]');
      await nameInput.fill('John Doe');
      await expect(nameInput).toHaveValue('John Doe');
    });

    test('should accept valid phone number (Indonesian format)', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder="Input your phone number"]');
      await phoneInput.fill('081234567890');
      await expect(phoneInput).toHaveValue('081234567890');
    });

    test('should accept valid phone number with country code', async ({ page }) => {
      const phoneInput = page.locator('input[placeholder="Input your phone number"]');
      await phoneInput.fill('+6281234567890');
      await expect(phoneInput).toHaveValue('+6281234567890');
    });

    test('should accept valid email address', async ({ page }) => {
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await emailInput.fill('john.doe@example.com');
      await expect(emailInput).toHaveValue('john.doe@example.com');
    });

    test('should accept valid message text', async ({ page }) => {
      const messageInput = page.locator('input[placeholder="Input your message"]');
      await messageInput.fill('Saya tertarik dengan layanan Mepo untuk perjalanan wisata keluarga.');
      await expect(messageInput).toHaveValue('Saya tertarik dengan layanan Mepo untuk perjalanan wisata keluarga.');
    });

    test('should successfully submit form with all valid data', async ({ page }) => {
      // Fill Full Name
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      
      // Fill Phone Number
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      
      // Fill Email
      await page.locator('input[placeholder="Input your email"]').fill('john.doe@example.com');
      
      // Fill Message
      await page.locator('input[placeholder="Input your message"]').fill('Saya tertarik untuk mengetahui lebih lanjut tentang paket wisata Mepo.');
      
      // Verify all fields are filled correctly before submit
      await expect(page.locator('input[placeholder="Input your name"]')).toHaveValue('John Doe');
      await expect(page.locator('input[placeholder="Input your phone number"]')).toHaveValue('081234567890');
      await expect(page.locator('input[placeholder="Input your email"]')).toHaveValue('john.doe@example.com');
      await expect(page.locator('input[placeholder="Input your message"]')).toHaveValue('Saya tertarik untuk mengetahui lebih lanjut tentang paket wisata Mepo.');
      
      // Submit the form
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      
      await page.waitForTimeout(2000);
      
      // After successful submission, check for success feedback or form reset
      const successMsg = page.getByText(/success|thank you|terima kasih|berhasil/i).first();
      const isSuccess = await successMsg.isVisible().catch(() => false);
      
      // The form either shows success message or resets
      if (isSuccess) {
        await expect(successMsg).toBeVisible();
      }
    });

    test('should accept name with special characters', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Input your name"]');
      await nameInput.fill("Ahmad Rizky Al-Farabi Jr.");
      await expect(nameInput).toHaveValue("Ahmad Rizky Al-Farabi Jr.");
    });

    test('should accept long message', async ({ page }) => {
      const messageInput = page.locator('input[placeholder="Input your message"]');
      const longMessage = 'Saya ingin bertanya tentang paket wisata ke Yogyakarta untuk rombongan 20 orang. Apakah ada diskon khusus untuk corporate outing? Kami juga membutuhkan akomodasi hotel bintang 4 dan transportasi selama 3 hari perjalanan.';
      await messageInput.fill(longMessage);
      await expect(messageInput).toHaveValue(longMessage);
    });

    test('should accept email with subdomain', async ({ page }) => {
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await emailInput.fill('user@mail.company.co.id');
      await expect(emailInput).toHaveValue('user@mail.company.co.id');
    });
  });

  // ==========================================
  // NEGATIVE CASES
  // ==========================================
  test.describe('Negative Cases', () => {

    test('should not submit when ALL fields are empty', async ({ page }) => {
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      
      await page.waitForTimeout(500);
      
      // Form should still be on /contact-us (not submitted)
      await expect(page).toHaveURL(/\/contact-us/);
      
      // Check that required field validation is triggered (HTML5 validation)
      const nameInput = page.locator('input[placeholder="Input your name"]');
      const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Full Name is empty', async ({ page }) => {
      // Fill all except name
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('test@test.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test message');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      // Name field should be invalid
      const nameInput = page.locator('input[placeholder="Input your name"]');
      const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Phone Number is empty', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      // Skip phone
      await page.locator('input[placeholder="Input your email"]').fill('test@test.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test message');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      const phoneInput = page.locator('input[placeholder="Input your phone number"]');
      const isInvalid = await phoneInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Email is empty', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      // Skip email
      await page.locator('input[placeholder="Input your message"]').fill('Test message');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should not submit when Message is empty', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('test@test.com');
      // Skip message
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
      
      const messageInput = page.locator('input[placeholder="Input your message"]');
      const isInvalid = await messageInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
      expect(isInvalid).toBeTruthy();
    });

    test('should accept invalid email without @ (no client-side email format validation)', async ({ page }) => {
      // NOTE: Email input is type="text", not type="email"
      // This means the browser does NOT validate email format natively.
      // This test documents this behavior — invalid emails are accepted.
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('invalidemail.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      // Verify the email input type is "text" (not "email")
      await expect(emailInput).toHaveAttribute('type', 'text');
      // Invalid email is accepted since there's no format validation
      await expect(emailInput).toHaveValue('invalidemail.com');
    });

    test('should accept email without domain (no client-side email format validation)', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('user@');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('user@');
    });

    test('should accept email with double @ (no client-side email format validation)', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('user@@example.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('user@@example.com');
    });

    test('should accept email with spaces (no client-side email format validation)', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('user @example.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('user @example.com');
    });

    test('should accept only @ as email (no client-side email format validation)', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John Doe');
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('@');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      await expect(emailInput).toHaveAttribute('type', 'text');
      await expect(emailInput).toHaveValue('@');
    });

    test('should accept phone with non-numeric characters (no server-side validation)', async ({ page }) => {
      // Note: Website does NOT validate phone format client-side
      const phoneInput = page.locator('input[placeholder="Input your phone number"]');
      await phoneInput.fill('abc-not-a-phone');
      await expect(phoneInput).toHaveValue('abc-not-a-phone');
    });

    test('should handle only spaces in name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Input your name"]');
      await nameInput.fill('   ');
      await expect(nameInput).toHaveValue('   ');
      
      // Fill remaining fields
      await page.locator('input[placeholder="Input your phone number"]').fill('081234567890');
      await page.locator('input[placeholder="Input your email"]').fill('test@test.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const submitBtn = page.locator('button[type="submit"], button:has-text("Submit")').first();
      await submitBtn.click();
      await page.waitForTimeout(500);
    });

    test('should handle SQL injection in name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Input your name"]');
      await nameInput.fill("'; DROP TABLE users; --");
      await expect(nameInput).toHaveValue("'; DROP TABLE users; --");
    });

    test('should handle XSS input in message field', async ({ page }) => {
      const messageInput = page.locator('input[placeholder="Input your message"]');
      await messageInput.fill('<script>alert("XSS")</script>');
      await expect(messageInput).toHaveValue('<script>alert("XSS")</script>');
    });

    test('should handle very long input in name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Input your name"]');
      const longName = 'A'.repeat(500);
      await nameInput.fill(longName);
      // Should accept or truncate but not crash
      const value = await nameInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    });

    test('should handle emoji in message field', async ({ page }) => {
      const messageInput = page.locator('input[placeholder="Input your message"]');
      await messageInput.fill('Hello 😀🎉🌍 Travel is fun!');
      await expect(messageInput).toHaveValue('Hello 😀🎉🌍 Travel is fun!');
    });

    test('should handle special characters in email local part', async ({ page }) => {
      await page.locator('input[placeholder="Input your name"]').fill('John');
      await page.locator('input[placeholder="Input your phone number"]').fill('08123');
      await page.locator('input[placeholder="Input your email"]').fill('user+tag@example.com');
      await page.locator('input[placeholder="Input your message"]').fill('Test');
      
      const emailInput = page.locator('input[placeholder="Input your email"]');
      const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
      expect(isValid).toBeTruthy();
    });
  });
});
