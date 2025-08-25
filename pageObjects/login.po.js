const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#email';
        this.passwordInput = '//input[@placeholder = "Password"]';
        this.loginButton = '//button[@id = "submit"]';
        this.logOut = '//button[@id = "logout"]';
        this.loginValidation = '//p[contains(text(),"Click on any contact to view the Contact Details")]';
        this.alertMessage = "//span[@id = 'error']";
    }

    async login(username, password) {
        await this.page.waitForTimeout(500); // reduce wait time
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async verifyValidLogin() {
        await this.page.waitForTimeout(2000);
        const loginValidationText = this.page.locator(this.loginValidation);
        await expect(loginValidationText).toHaveText("Click on any contact to view the Contact Details");
        await expect(this.page.locator(this.logOut)).toBeVisible();
    }

    async verifyInvalidLogin() {
        const alert = this.page.locator(this.alertMessage);
        await this.page.waitForTimeout(2000);
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText(/Incorrect username or password/i); 
    }

    async verifyEmptyFieldsError() {
        const alert = this.page.locator(this.alertMessage);
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText("Incorrect username or password");
    }
}

