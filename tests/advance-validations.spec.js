const {test, expect} = require('@playwright/test');

test('advance-validation-popup', async ({page}) => {
   await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text")).toBeHidden();
   page.on('dialog', dialog=>dialog.accept());
   await page.locator("#confirmbtn").click();
   await page.locator("#mousehover").hover();
   const frames = page.frameLocator('#courses-iframe');
   await frames.locator('li a[href*="lifetime-access"]:visible').click();
   const content =await frames.locator(".text h2").textContent();
   const numbers = content.split(' ');
   console.log(numbers[1]);  
})