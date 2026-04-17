# Mepo Travel - Playwright Automation Tests

Automated end-to-end testing for [dev.mepo.travel](https://dev.mepo.travel/) using Playwright (TypeScript).

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
| **Total** | **140** | |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps chromium

# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Interactive UI mode
npm run test:ui

# Debug mode
npm run test:debug

# View HTML report
npm run test:report
```

## 🔧 CI/CD

Tests run automatically via **GitHub Actions** on:
- ✅ Push to `main`/`master`
- ✅ Pull requests
- ✅ Daily schedule (08:00 WIB)
- ✅ Manual trigger (`workflow_dispatch`)

## 📁 Project Structure

```
mepo-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml     # CI/CD pipeline
├── tests/
│   ├── homepage.spec.ts       # Homepage text & buttons
│   ├── about.spec.ts          # About page content
│   ├── navigation.spec.ts     # Page navigation
│   ├── navbar-buttons.spec.ts # Contact Us & Download
│   ├── products.spec.ts       # Products page
│   ├── activities.spec.ts     # Activities page
│   ├── contact-form.spec.ts   # Form positive & negative cases
│   ├── language-switch.spec.ts # Language switcher
│   └── responsive.spec.ts     # Responsive design
├── playwright.config.ts       # Playwright configuration
├── package.json
└── README.md
```
