import {expect, test} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage.ts";
import loginData from "../testdata/LoginData.json" with {type:'json'};


loginData.forEach((data) => {
    test(`verify Login - ${data.label}`, async ({page})=>{
        let loginPage: LoginPage = new LoginPage(page);
        await loginPage.openLoginPage();
        await loginPage.enterUsername(data.username);
        await loginPage.enterPassword(data.password);
        await loginPage.clickOnLoginButton();
        if(data.status=="valid"){
             expect(page).toHaveTitle(" Administrator - Home - vtiger CRM 5 - Commercial Open Source CRM");

        }else{
             expect(loginPage.username).toBeVisible();

        }


   });
});
