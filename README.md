# Mepo Travel - Playwright Automation Tests

Automated end-to-end testing for [dev.mepo.travel](https://dev.mepo.travel/) using **Playwright** with **TypeScript**.

## 📊 Test Coverage

| Suite | Tests | Coverage |
|---|---|---|
| Homepage | 28 | Navbar, hero, partnership banner, value propositions, accordion, footer |
| About | 12 | Headings, vision, mission (6 items), navbar, footer |
| Navigation | 9 | All pages navigation, sequential nav, logo click |
| Navbar Buttons | 13 | Contact Us, Download dropdown (App Store + Google Play) |
| Products | 8 | Product items, images, WhatsApp links, categories |
| Activities | 9 | Article titles, content, images |
| Contact Form | 35 | Positive cases (9) + Negative cases (16) + Text validation (10) |
| Language Switch | 7 | ID/EN switcher, dropdown options |
| Responsive | 14 | Mobile, Tablet, Desktop, Wide Desktop |
| **Smoke Tests** | 6 | Critical flow sanity checks |
| **Visual Regression** | 7 | Full-page + component screenshot comparison |
| **API Monitoring** | 12 | Server errors, console errors, broken images, load time |
| **Accessibility** | 9 | WCAG 2.0 scan, alt text, headings, keyboard nav, contrast |
| **Data-Driven Form** | 10 | JSON-based test data (10 scenarios) |
| **Device Emulation** | 5×4 | iPhone 14, Galaxy S5, iPad Pro 11, Pixel 7 |
| **Total** | **~210+** | |

---

## 🆕 What's New (v2.0)

### 📊 Allure Report Integration
- Rich visual test reports with graphs and history
- Run: `npm run allure:generate` → `npm run allure:open`

### 📸 Visual Regression Testing
- Full-page screenshots for all 5 pages + navbar + footer
- Auto-compare with baseline — fails if UI changes > 2%
- Update baselines: `npm run test:update-snapshots`

### ⚡ API Response Monitoring
- Detects server errors (5xx) on all pages
- Catches browser console errors
- Finds broken images (404)
- Validates page load time < 5 seconds

### 🌐 Multi-Browser Testing
- **Chromium** ✅, **Firefox** ✅, **WebKit (Safari)** ✅
- Run per browser or all at once

### ♿ Accessibility (a11y) Testing
- WCAG 2.0 Level A & AA compliance scan (axe-core)
- Alt text audit, heading hierarchy check
- Keyboard navigation validation
- Color contrast analysis
- Violations logged as annotations in reports

### 🔄 Data-Driven Testing
- 10 test scenarios from `tests/data/contact-form-data.json`
- Includes: Indonesian names, Unicode, emoji, long text, edge cases

### 📱 Device Emulation
- iPhone 14, Galaxy S5, iPad Pro 11, Pixel 7
- Checks: page load, horizontal overflow, logo, footer

### 🏷️ Test Tagging & Selective Run
- `@smoke` — quick critical flow checks
- `@regression` — full regression suite
- `@critical` — most important flows only

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install browsers
npx playwright install --with-deps chromium firefox webkit

# Run all tests (Chromium only)
npm test

# Run with browser visible + cursor
npm run test:demo
```

## 📋 All Commands

### Running Tests
| Command | Description |
|---|---|
| `npm test` | All tests (Chromium) |
| `npm run test:demo` | Chrome visible + visual cursor + 1 worker |
| `npm run test:headed` | Chrome visible (parallel) |
| `npm run test:debug` | Step-by-step debugger |
| `npm run test:ui` | Interactive UI panel |
| `npm run test:smoke` | Smoke tests only (6 critical flows) |

### Browser-Specific
| Command | Description |
|---|---|
| `npm run test:chrome` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | WebKit (Safari) only |
| `npm run test:all-browsers` | All 3 browsers |

### Feature-Specific
| Command | Description |
|---|---|
| `npm run test:a11y` | Accessibility scan |
| `npm run test:visual` | Visual regression |
| `npm run test:api` | API monitoring |
| `npm run test:devices` | Device emulation (4 devices) |
| `npm run test:update-snapshots` | Regenerate visual baselines |

### Reports
| Command | Description |
|---|---|
| `npm run test:report` | Open Playwright HTML report |
| `npm run allure:generate` | Generate Allure report |
| `npm run allure:open` | Open Allure report in browser |

---

## 🔧 CI/CD

Tests run automatically via **GitHub Actions** on:
- ✅ Push to `main`/`master`
- ✅ Pull requests
- ✅ Daily schedule (08:00 WIB)
- ✅ Manual trigger (`workflow_dispatch`)

CI runs all 3 browsers and uploads Playwright + Allure reports as artifacts.

---

## 📁 Project Structure

```
mepo-playwright/
├── .github/workflows/
│   └── playwright.yml              # CI/CD pipeline
├── tests/
│   ├── data/
│   │   └── contact-form-data.json  # Data-driven test data
│   ├── visual-regression.spec.ts-snapshots/  # Baseline screenshots
│   ├── fixtures.ts                 # Custom fixture (visual cursor)
│   ├── homepage.spec.ts            # Homepage text & buttons
│   ├── about.spec.ts               # About page content
│   ├── navigation.spec.ts          # Page navigation
│   ├── navbar-buttons.spec.ts      # Contact Us & Download
│   ├── products.spec.ts            # Products page
│   ├── activities.spec.ts          # Activities page
│   ├── contact-form.spec.ts        # Form positive & negative cases
│   ├── contact-form-data-driven.spec.ts  # Data-driven form tests
│   ├── language-switch.spec.ts     # Language switcher
│   ├── responsive.spec.ts          # Responsive design
│   ├── smoke.spec.ts               # Smoke test suite
│   ├── visual-regression.spec.ts   # Visual screenshot tests
│   ├── api-monitoring.spec.ts      # API & error monitoring
│   ├── accessibility.spec.ts       # WCAG a11y testing
│   └── device-emulation.spec.ts    # Device profiles
├── playwright.config.ts            # Config (browsers + devices)
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚠️ Known Findings

| Finding | Severity | Details |
|---|---|---|
| Email input `type="text"` | Medium | No client-side email format validation |
| Phone accepts non-numeric | Low | No format validation on phone field |
| Products: `button-name` | Critical (a11y) | 2 buttons without accessible text |
| Activities: `color-contrast` | Serious (a11y) | 9 elements with low contrast ratio |
| Contact: `color-contrast` | Serious (a11y) | 10 elements with low contrast |
| Contact: `nested-interactive` | Serious (a11y) | 1 nested interactive control |
