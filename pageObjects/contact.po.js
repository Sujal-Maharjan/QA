const {expect} = require("@playwright/test")

exports.ContactPage = class ContactPage{
    constructor(page){
        this.page = page;
        this.addContact = '//button[@id="add-contact"]';
        this.firstName = "#firstname";
        this.lastName = "#lastname";
        this.dob = '//input[@placeholder="yyyy-MM-dd"]';
        this.email = '//input[@id="email"]';
        this.dob = '//input[@placeholder="yyyy-MM-dd"]';
        this.state = '//input[@placeholder="State or Province"]';
        this.postal = '//input[@placeholder="Postal Code"]';
        this.country = '//input[@id="submit"]';
        this.SavedFirstName = '//span[@id="name"]';
        this.SavedLastName = '//span[@id="name"]';
        this.SavedDOB = '//span[@id="name"]';
        this.SavedEmail = '//span[@id="name"]';
        this.SavedAddress ='//span[@id="street1"]';
        this.SavedCity ='//span[@id="city"]';
        this.SavedState='//span[@id="stateProvince"]';
        this.SavedPostal='//span[@id="postalCode"]';
        this.SavedCountry='//span[@id="country"]';
        this.Saved='//span[@id="name"]';
        this.viewCreatedContact = '//th[contains(text(), "Name")]//following::1';
		this.editContact = '//button[@id="edit-contact"]';
		this.deletedContact = '//button=[@id="delete"]';
       
  
    }

    
    async contactAdd(firstName, lastName, dateOfBirth, email, phone, address,city, state, postal ){
        await this.page.locator(this.addContact).click();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.dob).fill(dateOfBirth);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.address).fill(address);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.state).fill(this.state);
        await this.page.locator(this.postal).fill(postal);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.Save).click();

    }

    async valildateContactCreated(fname, lname, dob, email, phone, city, address, city){
        await expect(emailValidation).toHaveText(email);
        await expect(dobValidation).toHaveText(dob);
        // await expect{dobValidation}.toHaveText(dob);
        // await expect{dobValidation}.toHaveText(dob);
        // await expect{dobValidation}.toHaveText(dob);
        // await expect{dobValidation}.toHaveText(dob);

    }

    async viewContact(){
        await this.page,locator(this.viewCreatedContact).click();
    }

    async contactEdit(firstName){
        await this.page.locator(this.editContact).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Save).click();
    }

    async contactDelete(firstName){
        await this.page.waitForTimeout(2000);
        this.page.once('dialog', async dialog =>{
            console.log('Dialog message: $(dialog.message())');
            await dialog.accept();
        })
        await this.page.locator(this.deletedContact).click();
    }

}
