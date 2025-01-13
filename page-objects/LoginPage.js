export class Login {
    constructor(page){
        this.page = page;
        this.signInButton = this.page.locator("[value='Login']")
        this.userEmail = this.page.locator("#userEmail")
        this.userPassword = this.page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto(baseUrl);
    }
    async validLogin(userEmail, userPassword){
        await this.userEmail.fill(userEmail);
        await this.userPassword .fill(userPassword);
        await this.signInButton.click();
    }
}