import{test} from '@playwright/test';
import { LoginPage } from  '../pageObjects/login.po.js';
import { ContactPage } from  '../pageObjects/contact.po.js';
import { request } from 'http';
import { create } from 'domain';
import { access } from 'fs';
const testData= require('../fixtures/contactFixture.json');
const {authenticateUser,createEntity}= require('../Helper.spec.js');


test.beforeEach(async({page})=>{
    const login = new LoginPage(page);
    await login.goto('/https://thinking-tester-contact-list.herokuapp.com/');
    await login.login("itsfunny77777@gmail.com","funny@2004");
    await login.verifyValidLogin();
});

test.describe("Valid contact tests", () => {
  test("Valid Contact", async ({ page }) => {
    const validContact = new ContactPage(page);

await validContact.contactAdd(
  testData.validContact.firstName,        
  testData.validContact.lastName,        
  testData.validContact.dateOfBirth,      
  testData.validContact.email,
  testData.validContact.phone,
  testData.validContact.address,                                            
  testData.validContact.city,
  testData.validContact.state,           
  testData.validContact.postal,           
  testData.validContact.country
      
    );

    await validContact.validateContactCreated(
        testData.validContact.firstName,        
        testData.validContact.lastName,        
        testData.validContact.dateOfBirth,      
        testData.validContact.email,
        testData.validContact.phone,
        testData.validContact.address,                                            
        testData.validContact.city,
        testData.validContact.state,           
        testData.validContact.postal,           
        testData.validContact.country
    );
  });
});

test ('Contact Edit test', async ({page, request}) => {

  const Data = {
    " firstName" : " John",
    " lastName": "Doe",
    "birthdate": "1990-06-30",
    "email": "johndoe@gmail.com",
    "phone": "9898444444",
    "street1": "Address1",
    "city": "City1",
    "stateProvince": "State1",
    "postalCode": "12345",
    "country": "Nepal"
  }
  const contact = new ContactPage(page);
  accessToken = await authenticateUser("itsfunny77777@gmail.com","funny@2004",{request});
  await createEntity (Data,accessToken,'/contacts',{request});
  page.reload();
  await contact.viewContact();
  await contact.contactEdit(contactTestData.contactEdit.firstName);
  await contact.validateContactCreated(contactTestData.contactEdit.firstName,contactTestData.contactEdit.lastName,contactTestData.contactEdit.password);
});

test ('Contact Delete test', async ({page,request}) => {
    const Data = {
      "firstName": "John",
      "lastName": "Doe",
      "birthdate" : "1990-06-30",
      "email": "johndoe@gmail.com",
      "phone": "9844543545",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };

    const contact = new ContactPage (page);
    accessToken = await authenticateUser ("itsfunny77777@gmail.com","funny@2004",{request});
    await createEntity (Data,accessToken,'/contacts',{request});
    page.reload();
    await contact.viewContact();
    const id = await getEntity ( accessToken, '/contacts', '200', {request});
    await contact.contactDelete();
    await validateEntity (accessToken, '/contacts/${id}', '404' , {request});
})

test.afterEach(async ({page}) => {
  await page.close();
})