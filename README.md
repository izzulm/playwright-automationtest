# 🧪 Automation Testing - Playwright

This repository contains the solutions to create automation test using [Playwright](https://playwright.dev/) and TypeScript.  
It includes a test strategy, UI automation scripts, and exploratory testing insights.

---

## 📁 Project Structure
├── helper/ # Reusable helper functions (e.g., Sign In)
│ └── sign_in.ts
├── pages/ # Page Object Model (POM) layer
│ └── dealls.page.ts
├── tests/ # Main test specs
│ └── dealls.spec.ts
├── .env # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts # Playwright configuration
└── README.md

---

## 🚀 How to Run Tests

> Make sure Node.js (v18+) is installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/izzulm/playwright-automationtest.git
cd playwright-automationtest
```

### 2. Install Dependencies
npm install

### 3. Install Browser
npx playwright install

### 4. Run tests
npx playwright test
