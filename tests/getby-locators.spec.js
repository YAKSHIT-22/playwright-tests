const {test, expect} = require('@playwright/test');

// to make it understand that its a playwright fixture we have to wrap it in curly braces in parameters
test('basic-validation-tests-with-context', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Employed').check();
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole('button', {name: 'Add'}).click();
})