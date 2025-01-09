const {test, expect} = require('@playwright/test');

test('basic-validation-tests-locators', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
    // css, xpath can be used to find elements on wepage
    // CHRO-PATH EXTENSION CAN BE USED TO CHECK CSS BASED LOCATOR
        //here making reusable locator
        const usernameInput = page.getByPlaceholder('email@example.com');
        const passwordInput = page.getByPlaceholder('enter your passsword');
        const signIn = page.getByRole('button', {name: 'login'});
        const cardTitle = page.locator('.card-body b');
        const productName = "ADIDAS ORIGINAL"
    await usernameInput.fill('');
    await passwordInput.fill('');
    await signIn.click();
    //await page.waitForLoadState('networkidle')
    await cardTitle.first().waitFor()
    await page.locator('.card-body').filter({hasText:productName}).getByRole('button' , {name: 'Add To Cart'}).click();
    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole('button', {name: 'Checkout'}).first().click();
    await page.getByPlaceholder('Select Country').pressSequentially('ind');
    await page.getByRole('button', {name: 'India'}).nth(1).click();
    await page.getByText('Place Order').click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
})