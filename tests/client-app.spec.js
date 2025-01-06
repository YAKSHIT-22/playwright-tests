const {test, expect} = require('@playwright/test');

test('basic-validation-tests-locators', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
    // css, xpath can be used to find elements on wepage
    // CHRO-PATH EXTENSION CAN BE USED TO CHECK CSS BASED LOCATOR
        //here making reusable locator
        const usernameInput = page.locator('#userEmail');
        const passwordInput = page.locator('#userPassword');
        const signIn = page.locator('[name="login"]');
        const cardTitle = page.locator('.card-body b');
    await usernameInput.fill('');
    await passwordInput.fill('');
    await signIn.click();
    //await page.waitForLoadState('networkidle')
    await cardTitle.first().waitFor()
    console.log(await cardTitle.allTextContents());
})