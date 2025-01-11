const { test, expect, request } = require("@playwright/test");

test.beforeAll("login-context-save", async ({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const usernameInput = page.getByPlaceholder("email@example.com");
  const passwordInput = page.getByPlaceholder("enter your passsword");
  const signIn = page.getByRole("button", { name: "login" });
  await usernameInput.fill("anshika@gmail.com");
  await passwordInput.fill("Iamking@000");
  await signIn.click();
  await page.waitForLoadState('networkidle')
  await context.storageState({path: "auth/state.json"});
});

test("basic-validation-tests-locators", async ({ browser }) => {
  const context = await browser.newContext({storageState: 'auth/state.json'});  
  const page = await context.newPage();
  page.goto("https://rahulshettyacademy.com/client")
  const cardTitle = page.locator(".card-body b");
  const productName = "ADIDAS ORIGINAL";
  //await page.waitForLoadState('networkidle')
  await cardTitle.first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).first().click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("Place Order").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});
