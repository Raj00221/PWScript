import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.ts";
import commonData from "../testdata/CommonData.json" with { type: 'json' };
import testData from "../testdata/TestData.json" with {type:'json'};
import { HomePage } from "../pages/HomePage.ts";
import { LeadPage } from "../pages/LeadsModule/LeadPage.ts";
import { CreateLeadPage } from "../pages/LeadsModule/CreateLeadPage.ts";
import { LeadDetailsPage } from "../pages/LeadsModule/LeadDetailsPage.ts";
import createLeadData from "../testdata/CreateLead.json" with { type: 'json' };

createLeadData.forEach((data)=>{
  test(`VT001_Verify_Create_Lead - ${data.label}`, async ({ page }) => {
     let loginPage: LoginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.enterUsername(commonData.login.username);
    await loginPage.enterPassword(commonData.login.password);
    await loginPage.clickOnLoginButton();
    let homePage: HomePage = new HomePage(page);
    await homePage.clickOnLeadModule();
    let leadPage: LeadPage = new LeadPage(page);
    await leadPage.clickOnCreateLeadButton();
    let createLeadPage: CreateLeadPage = new CreateLeadPage(page);
    await createLeadPage.selectTitle(data.Title);
    await createLeadPage.enterFirstName(data.firstname);
    await createLeadPage.enterLastName(data.lastName);
    await createLeadPage.enterCompany(data.company);
    await createLeadPage.clickOnSaveButton();
     
    expect(page).toHaveTitle(" Administrator - Leads - vtiger CRM 5 - Commercial Open Source CRM");
    let ldp : LeadDetailsPage=new LeadDetailsPage(page);
    expect(ldp.leadDetailHeading).toContainText("-  Lead Information");
    expect(ldp.firstNameText).toHaveText(data.firstname);
    expect(ldp.lastNameText).toHaveText(data.lastName);
    expect(ldp.companyText).toHaveText(data.company);



});

});



test('VT002_Verify_Create_Lead_And_Edit_Lead', async ({ page }) => {
   await createLeadFlow(page);
    let createLeadPage : CreateLeadPage= new CreateLeadPage(page);
    let leadDetailsPage: LeadDetailsPage = new LeadDetailsPage(page);
    expect(leadDetailsPage.editButton).toBeVisible();
    expect(leadDetailsPage.editButton).toBeEnabled();

    await leadDetailsPage.clickOnEditButton();
    expect(leadDetailsPage.editButton).toBeHidden();
    
expect(createLeadPage.firstName).toHaveAttribute("class", "xyz");
    // verify firstname, lastname , company, title is correct on edit lead page
    expect(createLeadPage.firstName).toHaveValue(commonData.createLeadData.firstName);
    expect(createLeadPage.lastName).toHaveValue(commonData.createLeadData.lastName);
    expect(createLeadPage.company).toHaveValue(commonData.createLeadData.company);
    expect(createLeadPage.titleName).toHaveValue(commonData.createLeadData.title);

    await createLeadPage.enterFirstName(testData.vt002.updatedFirstName);
    await createLeadPage.enterLastName(testData.vt002.updatedLastName);
    await createLeadPage.clickOnSaveButton();
    expect(leadDetailsPage.lastNameText).toHaveText(testData.vt002.updatedLastName);
    expect(leadDetailsPage.firstNameText).toContainText(testData.vt002.updatedFirstName);

});


test('VT003_Verify_Create_Lead_And_Delete_Lead', async ({ page }) => {
   await createLeadFlow(page);
    let leadDetailsPage: LeadDetailsPage = new LeadDetailsPage(page);
    await leadDetailsPage.clickOnDeleteButton();
    await leadDetailsPage.acceptAlert();
});


  async function createLeadFlow(page:Page){
    let loginPage: LoginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.enterUsername(commonData.login.username);
    await loginPage.enterPassword(commonData.login.password);
    await loginPage.clickOnLoginButton();
    let homePage: HomePage = new HomePage(page);
    await homePage.clickOnLeadModule();
    let leadPage: LeadPage = new LeadPage(page);
    await leadPage.clickOnCreateLeadButton();
    let createLeadPage: CreateLeadPage = new CreateLeadPage(page);
    await createLeadPage.selectTitle(commonData.createLeadData.title);
    await createLeadPage.enterFirstName(commonData.createLeadData.firstName);
    await createLeadPage.enterLastName(commonData.createLeadData.lastName);
    await createLeadPage.enterCompany(commonData.createLeadData.company);
    await createLeadPage.clickOnSaveButton();

   
  }