
### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies as specified in `package.json`:
- `@playwright/test` - Core Playwright testing library
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution for Node.js
- `@types/node` - TypeScript definitions for Node.js

### 3. Install Playwright Browsers (First Time Only)

```bash
npx playwright install
```

This downloads the browser binaries (Chromium, Firefox, WebKit) required for testing.

---

## 📁 Project Structure

```
playWright/
├── pages/                          # Page Object Model classes
│   ├── BasePage.ts                # Base class with common methods
│   ├── HomePage.ts                # Home page object
│   ├── LoginPage.ts               # Login page object
│   └── LeadsModule/               # Lead management pages
│       ├── LeadPage.ts            # Leads list page
│       ├── CreateLeadPage.ts      # Create lead form
│       └── LeadDetailsPage.ts     # Lead details view
│
├── tests/                         # Test specifications
│   └── LeadTestScenarios.spec.ts # Lead module tests
│
├── testdata/                      # Test data
│   ├── CommonData.ts             # Shared test data
│   └── TestData.ts               # Test scenario specific data
│
├── playwright-report/            # HTML test reports
│   ├── index.html
│   └── data/
│
├── test-results/                 # Test execution results
│   └── [test-results-folders]
│
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project dependencies
└── README.md                      # This file
```

---

## ⚙️ Configuration

### playwright.config.ts

Key configuration settings:

| Setting | Value | Description |
|---------|-------|-------------|
| **testDir** | `./tests` | Directory containing test files |
| **fullyParallel** | `true` | Run tests in parallel |
| **timeout** | `300000ms` | 5 minutes timeout per test |
| **retries** | `2 (CI mode)` | Retry failed tests |
| **headless** | `false` | Run browser in headed mode (visible) |
| **screenshot** | `only-on-failure` | Capture screenshots only on failure |
| **video** | `retain-on-failure` | Record video only on test failure |
| **trace** | `on-first-retry` | Enable trace on first retry |

### Custom Configuration

To modify settings, edit `playwright.config.ts`:

```typescript
use: {
    headless: true,  // Set to true to run in headless mode
    screenshot: 'off',  // Disable screenshots
    video: 'off',  // Disable video recording
    actionTimeout: 30 * 1000,  // 30 seconds for each action
    navigationTimeout: 60 * 1000,  // 60 seconds for page navigation
},
```

---

## 📄 Page Object Model

### What is POM?

The **Page Object Model** is a design pattern that creates an abstraction layer for all UI elements. Each page has a corresponding class that:
- Encapsulates page elements (selectors)
- Provides methods for user interactions
- Reduces code duplication
- Makes tests easier to maintain

### BasePage Class

The `BasePage.ts` is the base class that all page objects inherit from:

```typescript
export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async hitUrl(url: string): Promise<void>
    async getCurrentUrl(): Promise<string>
    async getCurrentTitle(): Promise<string>
    async goBackPage(): Promise<void>
    // ... other common methods
}
```

### Creating a Page Object

Example: `LoginPage.ts`

```typescript
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class LoginPage extends BasePage {
    // Define locators
    usernameField = () => this.page.locator('[id="username"]');
    passwordField = () => this.page.locator('[id="password"]');
    loginButton = () => this.page.locator('button[type="submit"]');

    async openLoginPage() {
        await this.hitUrl("https://your-app-url/login");
    }

    async enterUsername(username: string) {
        await this.usernameField().fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordField().fill(password);
    }

    async clickOnLoginButton() {
        await this.loginButton().click();
    }
}
```

### Using Page Objects in Tests

```typescript
test('Login Test', async ({ page }) => {
    let loginPage: LoginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.enterUsername("admin");
    await loginPage.enterPassword("admin");
    await loginPage.clickOnLoginButton();
});
```

---

## 📊 Test Data Management

Test data is centralized in the `testdata/` folder for easy maintenance and reusability.

### CommonData.ts

Contains data shared across multiple tests:

```typescript
export let commonData = {
    login: {
        username: "admin",
        password: "admin"
    },

    createLeadData: {
        firstName: "Rahul",
        lastName: "Yadav",
        title: "Mr.",
        company: "svam",
        phone: "9876543210"
    }
}
```

### TestData.ts

Contains test scenario-specific data:

```typescript
export let testdata = {
    vt002: {
        updatedFirstName: "John",
        updatedLastName: "Smith"
    },
    
    vt003: {
        // VT003 test data
    }
}
```

### Using Test Data

```typescript
import { commonData } from "../testdata/CommonData.ts";
import { testdata } from "../testdata/TestData.ts";

test('Create Lead', async ({ page }) => {
    await loginPage.enterUsername(commonData.login.username);
    await createLeadPage.enterFirstName(commonData.createLeadData.firstName);
    // ...
    await createLeadPage.enterFirstName(testdata.vt002.updatedFirstName);
});
```

---

## ✍️ Writing Tests

### Test File Structure

Tests are written in `tests/LeadTestScenarios.spec.ts` using Playwright's test syntax:

```typescript
import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";

test('VT001_Verify_Create_Lead', async ({ page }) => {
    // Test implementation
});
```

### Best Practices for Writing Tests

1. **Use Descriptive Test Names**: Clear naming helps identify failures
   ```typescript
   test('VT001_Verify_Create_Lead', async ({ page }) => {
   ```

2. **Extract Reusable Flows**: Create helper functions for common workflows
   ```typescript
   async function createLeadFlow(page: Page) {
       // Login and create lead logic
   }
   ```

3. **Use Page Objects**: Never use locators directly in tests
   ```typescript
   // ✅ Good
   let loginPage: LoginPage = new LoginPage(page);
   await loginPage.clickOnLoginButton();

   // ❌ Bad
   await page.click('[id="loginBtn"]');
   ```

4. **Add Meaningful Assertions**: Verify expected outcomes
   ```typescript
   expect(ldp.leadDetailHeading).toContainText("-  Lead Information");
   expect(ldp.firstNameText).toHaveText(commonData.createLeadData.firstName);
   ```

5. **Use Async/Await**: Properly handle asynchronous operations
   ```typescript
   await loginPage.openLoginPage();
   await loginPage.enterUsername(commonData.login.username);
   ```

### Example Test Structure

```typescript
test('VT002_Verify_Create_Lead_And_Edit_Lead', async ({ page }) => {
    // Step 1: Setup - Create a lead
    await createLeadFlow(page);

    // Step 2: Execute - Edit the lead
    let leadDetailsPage: LeadDetailsPage = new LeadDetailsPage(page);
    await leadDetailsPage.clickOnEditButton();
    await createLeadPage.enterFirstName(testdata.vt002.updatedFirstName);
    await createLeadPage.clickOnSaveButton();

    // Step 3: Verify - Assert the changes
    expect(leadDetailsPage.firstNameText).toHaveText(testdata.vt002.updatedFirstName);
});
```
