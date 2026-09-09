import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "../BasePage.ts";


export class LeadDetailsPage extends BasePage {
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    readonly leadDetailHeading : Locator;
    readonly firstNameText : Locator;
    readonly lastNameText : Locator;
    readonly companyText : Locator;
   readonly  titleText : Locator;

    constructor(page: Page) {
        super(page);
        this.deleteButton = page.locator("//input[@title='Delete [Alt+D]']").first();
        this.leadDetailHeading = page.locator("//span[@class='dvHeaderText']");
        this.editButton = page.locator("//input[@title='Edit [Alt+E]']").first();
        this.firstNameText= page.locator("//span[@id='dtlview_First Name']");
        this.lastNameText=page.locator("//span[@id='dtlview_Last Name']");
        this.companyText=page.locator("//span[@id='dtlview_Company']");
        this.titleText=page.locator("//span[@id='dtlview_Title']");

    }

    async clickOnDeleteButton() {
        await this.clickForcely(this.deleteButton);
    }

    // async verifyCreatedLead(expText: string) {
    //     expect(this.createdLeadText).toContainText(expText);
    // }

    async clickOnEditButton() {
        await this.click(this.editButton);
    }

}
