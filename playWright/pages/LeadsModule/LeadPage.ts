import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class LeadPage extends BasePage {


    readonly createLeadButton: Locator;
    readonly searchField: Locator;
    readonly searchNowButton: Locator;
    readonly firstLeadToEdit: Locator;
    readonly editLink: Locator;


    constructor(page: Page) {
        super(page);
        this.createLeadButton = page.locator("//img[@src='themes/softed/images/btnL3Add.gif']");
        this.searchField = page.locator("//input[@name='search_text']");
        this.searchNowButton = page.locator("//input[@name='submit']");
        this.firstLeadToEdit = page.locator("//a[@title='Leads']").first();
        this.editLink = page.locator("//a[text()='edit']");


    }

    async clickOnCreateLeadButton() {
        await this.click(this.createLeadButton);
    }

    async enterDataInSearchBox(leadNo: string) {
        await this.enterText(this.searchField, leadNo);
    }

    async clickOnLeadSearchNowButton() {
        await this.click(this.searchNowButton);
    }

    async openFirstLeadDeatailPage() {
        await this.click(this.firstLeadToEdit);
    }

    async clickOnLeadEditLink() {
        await this.click(this.editLink);
    }

}