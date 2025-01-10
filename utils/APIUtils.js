export class APIUtils {
  constructor(apiContext, payload) {
    this.apiContext = apiContext;
    this.payload = payload;
  }
  async getToken() {
    const response = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.payload,
      }
    );
    const results = await response.json();
    return results.token;
  }
  async createOrder(ordersPayload) {
    const token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: ordersPayload,
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json",
        },
      }
    );
    return {token: token, response:orderResponse}
  }
}
