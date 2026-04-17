import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Timeout per test */
  timeout: 30000,

  /* Expect timeout */
  expect: {
    timeout: 10000,
  },

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,

  /* Reporter — Allure + HTML + List */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright'],
  ],

  /* Shared settings for all projects */
  use: {
    baseURL: 'https://dev.mepo.travel',

    /* Collect trace on first retry */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video recording */
    video: 'on-first-retry',

    /* Navigation timeout */
    navigationTimeout: 15000,

    /* Action timeout */
    actionTimeout: 10000,
  },

  /* Configure projects for multiple browsers & devices */
  projects: [
    // === Desktop Browsers ===
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // === Device Emulation (only for device-emulation.spec.ts) ===
    {
      name: 'iphone14',
      testMatch: 'device-emulation.spec.ts',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'galaxy-s5',
      testMatch: 'device-emulation.spec.ts',
      use: { ...devices['Galaxy S5'] },
    },
    {
      name: 'ipad-pro',
      testMatch: 'device-emulation.spec.ts',
      use: { ...devices['iPad Pro 11'] },
    },
    {
      name: 'pixel7',
      testMatch: 'device-emulation.spec.ts',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
