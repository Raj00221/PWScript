import { Page, Locator } from "@playwright/test";
import { BasePage } from "../BasePage.ts";

export class CreateLeadPage extends BasePage {
    readonly titleName: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly street: Locator;
    readonly city: Locator;
    readonly description: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.titleName = page.locator("//select[@name='salutationtype']");
        this.firstName = page.locator("//input[@name='firstname']");
        this.lastName = page.locator("//input[@name='lastname']");
        this.company = page.locator("//input[@name='company']");
        this.street = page.locator("//textarea[@name='lane']");
        this.city = page.locator("//input[@id='city']");
        this.description = page.locator("//textarea[@name='description']")
        this.saveButton = page.locator("//input[@title='Save [Alt+S]']").nth(0);
    }



    async selectTitle(title: string) {
        await this.selectOptionByValue(this.titleName, title);
    }
    async enterFirstName(firstName: string) {
        await this.enterText(this.firstName, firstName);
    }

    async enterLastName(lastName: string) {
        await this.enterText(this.lastName, lastName);
    }
    async enterCompany(company: string) {
        await this.enterText(this.company, company);
    }

    async enterStreet(street: string) {
        await this.enterText(this.street, street);
    }

    async enterCity(city: string) {
        await this.enterText(this.city, city);
    }
    async enterDescription(description: string) {
        await this.enterText(this.description, description);
    }



    async clickOnSaveButton() {

        await this.click(this.saveButton);
    }



}