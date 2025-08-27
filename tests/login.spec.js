import {test, expect} from '@playwright/test';
import { beforeEach } from 'node:test';

test('login', async ({ page }) => {
  console.log("greeere")
  await page.goto('https://hamrobazaar.com/login');
  console.log("gere")
  await page.locator("//input[@type='tel']").fill("9886158433");
  await page.locator("//input[@id='password']").fill("suzal");
  await page.locator("//button[@type='submit']").click();
  await page.waitForTimeout(20000)         
});

test('invalid login',async ({ page }) => {
  await page.goto('https://www.pinterest.com/login')
  await page.getByPlaceholder("Email or phone number").fill("9886158433");
  await page.getByPlaceholder("Password").fill("suzalhello");
  await page.getByRole("button", {name: "Log in"}).click()
  await page.waitForTimeout(20000)
  return 
});

test('invalid email',async ({ page }) => {
  await page.goto('https://www.pinterest.com/login')
  await page.getByPlaceholder("Email or phone number").fill("9886158433@xyz.com");
  await page.getByPlaceholder("Password").fill("suzal");
  await page.getByRole("button", {name: "Log in"}).click()
  await page.waitForTimeout(20000)
});

// test('invalid password',async ({ page }) => {
//   await page.goto('https://www.pinterest.com/login')
//   await page.getByPlaceholder("Email or phone number").fill("9886158433");
//   await page.getByPlaceholder("Password").fill("suzalhello@123");
//   await page.getByRole("button", {name: "Log in"}).click()
//   await page.waitForTimeout(20000)
// });





