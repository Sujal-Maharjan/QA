import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';

const testData = require('../fixtures/loginFixtures.json');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Login Tests', () => {

  test('Valid login with correct username and password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
  });

  test('Invalid login with wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.userName, testData.invalidUser.password);
    await login.verifyInvalidLogin(); 
  });

  test('Invalid login with wrong username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.invalidUser.userName, testData.validUser.password);
    await login.verifyInvalidLogin();
  });

  test('Invalid login with empty username and password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('', '');
    await login.verifyEmptyFieldsError(); 
  });

  test('Invalid login with only username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.userName, '');
    await login.verifyEmptyFieldsError();
  });

  test('Invalid login with only password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('', testData.validUser.password);
    await login.verifyEmptyFieldsError();
  });

});
