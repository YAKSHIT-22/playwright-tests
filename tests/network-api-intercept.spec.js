
const {test, expect,request} = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const payLoad = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
}
const ordersPayload = {
    orders: [
      {
        country: "India",
        productOrderedId: "6581ca979fd99c85e8ee7faf"
      }
    ]
  }
  const fakePayLoad = {
    data: [],
    message: "No Orders"
  }
let orderResults;

test.beforeAll('login-api-test', async({})=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, payLoad);
    const result = await apiUtils.createOrder(ordersPayload)
    expect(result.response.ok()).toBeTruthy();
    orderResults = result;
})

test('network-interception-tests', async ({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem('token', value);
    }, orderResults.token)
    await page.goto('https://rahulshettyacademy.com/client');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca', async route=>{
        const response = await page.request.fetch(route.request())
        route.fulfill({
            response,
            body: JSON.stringify(fakePayLoad)
        })

    })
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca")
    page.getByText(`You have No Orders to show at this time.
    Please Visit Back Us `).isVisible();
})


test('security-interception-tests', async ({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem('token', value);
    }, orderResults.token)
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("button[routerlink*='myorders']").click();
    await page.route(`https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*`, async route=>route.continue({
        url: `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6`,
    }))
    await page.locator("button:has-text('View')").nth(0).click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})


test('network-abort-tests', async ({page})=>{
    await page.route('**/*.css',route=>route.abort());
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        const usernameInput = page.locator('#username');
        const passwordInput = page.locator('#password');
        const signIn = page.locator('#signInBtn');
    await usernameInput.fill('learning');
    await passwordInput.fill('12345678');
    await signIn.click();
    await page.pause();
})

