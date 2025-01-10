const {test, expect,request} = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const payLoad = {
    userEmail: "",
    userPassword: ""
}
const ordersPayload = {
    orders: [
      {
        country: "India",
        productOrderedId: "6581ca979fd99c85e8ee7faf"
      }
    ]
  }
let orderResults;

test.beforeAll('login-api-test', async({})=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, payLoad);
    const result = await apiUtils.createOrder(ordersPayload)
    expect(result.response.ok()).toBeTruthy();
    orderResults = result;
})

test('basic-validation-tests-locators', async ({page})=>{
    page.addInitScript(value=>{
        window.localStorage.setItem('token', value);
    }, orderResults.token)
    await page.goto('https://rahulshettyacademy.com/client');
    const result = await orderResults.response.json();
    expect(result.message).toBe('Order Placed Successfully');
    console.log(result.orders[0]);
})