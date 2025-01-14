const {expect} = require('@playwright/test');
const { Login } = require('../page-objects/LoginPage');
const dataSet  = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));
const {test}  = require('./test-base.spec');

test('basic-validation-tests-locators-page-object', async ({page, testDataForOrder})=>{
        const cardTitle = page.locator('.card-body b');
        const productName = dataSet.productName;
        const userEmail = dataSet.userEmail;
        const userPassword = dataSet.userPassword;
    const Login = new Login(page);
    await Login.goTo('https://rahulshettyacademy.com/client');
    await Login.validLogin(userEmail, userPassword);
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