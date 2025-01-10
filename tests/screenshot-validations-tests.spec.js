const {test, expect} = require('@playwright/test');

test('screenshot-tests', async ({page}) => {
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await page.screenshot({path: 'assets/screenshot.png'});
   await expect(page.locator("#displayed-text")).toBeHidden(); 
})

test('visual-tests', async ({page}) => {
    await page.goto('https://google.com');
    expect(await page.screenshot()).toMatchSnapshot('assets/landing.png');
})

