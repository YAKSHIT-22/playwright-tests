const {test, expect} = require('@playwright/test');

// to make it understand that its a playwright fixture we have to wrap it in curly braces in parameters
test('basic-validation-tests-with-context', async ({browser})=>{
 
    //here we added browser explicitly if we want to set some context - plugins , proxies, cookies and more
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://google.com');

})

// only one test run in below case
// test.only('basic-validation-tests-default', async ({page})=>{
 
//     //here we added page only other stuff is already in place in default mode
//     await page.goto('https://google.com');

// })
test('basic-validation-tests-default', async ({page})=>{
    //here we added page only other stuff is already in place in default mode
    await page.goto('https://google.com');
    await page.title();
    await expect(page).toHaveTitle('Google');
})


test('basic-validation-tests-locators', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // css, xpath can be used to find elements on wepage
    // CHRO-PATH EXTENSION CAN BE USED TO CHECK CSS BASED LOCATOR
        //here making reusable locator
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const signIn = page.locator('#signInBtn');
        const cardTitle = page.locator('.card-body a');
    await usernameInput.fill('learning');
    await passwordInput.fill('12345678');
    await signIn.click();
    await page.locator('[style*="block"]').textContent();
    await expect(page.locator('[style*="block"]')).toHaveText('Incorrect username/password.');
    await usernameInput.fill("");
    await passwordInput.fill("");
    await usernameInput.fill('');
    await passwordInput.fill('');
    await signIn.click();
    await expect(cardTitle.nth(0)).toHaveText('iphone X');
    await cardTitle.allTextContents();
})

test('basic-validation-tests-ui-controls', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // css, xpath can be used to find elements on wepage
    // CHRO-PATH EXTENSION CAN BE USED TO CHECK CSS BASED LOCATOR
        //here making reusable locator
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const dropdown = page.locator('select.form-control');
        const signIn = page.locator('#signInBtn');
        const cardTitle = page.locator('.card-body a');
        const documentLink = page.locator("[href*='documents-request']");
    await usernameInput.fill('learning');
    await passwordInput.fill('12345678');
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')
})


test('basic-validation-tests-ui-child-tab-handling', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        //here making reusable locator
        const documentLink = page.locator("[href*='documents-request']");
    const [newPage] =await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()])
    console.log(await newPage.locator('.red').textContent());

})


test.only('basic-validation-tests-codegen', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByLabel('Search', { exact: true }).click();
    await page.getByLabel('Search', { exact: true }).fill('rahul shetty ');
    await page.getByText('academy', { exact: true }).click();
    await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
    await page.getByRole('link', { name: 'Courses', exact: true }).click();
    await page.getByText('Hyderabad QA Meetup Rahul').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: '[Set a button action]' }).click();
    const page1 = await page1Promise;
  });