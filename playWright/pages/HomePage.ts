import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage.ts";

export class HomePage extends BasePage {


    readonly leadModule: Locator;
    readonly leadModule1: Locator;
    readonly organizationModule: Locator;
    readonly contactsModule: Locator;
    readonly opportunity: Locator;
    readonly products: Locator;
    readonly links: Locator;
    readonly helpAdmIcon: Locator;
    readonly help: Locator;
    readonly documents: Locator;
    readonly feedback: Locator;
    readonly feedBackSummary: Locator;
    readonly feedBackEmail: Locator;
    readonly feedBackDesc: Locator;
    readonly feedBackVersion: Locator;
    readonly feedBackSendBtn: Locator;
    readonly dltLink: Locator;
    readonly moreModule: Locator;
    readonly compaigns: Locator;



    constructor(page: Page) {
        super(page);
        this.leadModule = page.locator("//a[text()='Leads']");
        this.leadModule1 = page.locator("//a[@href='index.php?module=Leads&action=index']");
        this.organizationModule = page.locator("//a[text()='Organizations']");
        this.contactsModule = page.locator("//a[text()='Contacts']");
        this.opportunity = page.locator("//a[text()='Opportunities']");
        this.products = page.locator("//a[text()='Products']");
        this.links = page.locator("//a");
        this.helpAdmIcon = page.locator("//img[@src='themes/softed/images/info.PNG']");
        this.help = page.locator("//a[text()='Help']");
        this.feedback = page.locator("//a[text()='Feedback']");
        this.documents = page.locator("//a[text()='Documents']").first();
        this.feedBackSummary = page.locator("//input[@name='subject']");
        this.feedBackEmail = page.locator("//input[@name='sender-email']");
        this.feedBackDesc = page.locator("//textarea");
        this.feedBackVersion = page.locator("//select[@name='vtigerversion']");
        this.feedBackSendBtn = page.locator("//input[@type='submit']");
        this.dltLink = page.locator("//a[text()='del']").first();
        this.moreModule = page.locator("//a[text()='More']");
        this.compaigns = page.locator("//a[@name='Campaigns']");



    }

    async clickOnLeadModule() {
        await this.click(this.leadModule);
    }
    async clickOnLeadModule1() {
        await this.click(this.leadModule1);
    }

    async clickOnOrganizationModule() {
        await this.click(this.organizationModule);
    }

    async clickOnContactsModule() {
        await this.click(this.contactsModule);
    }

    async clickOnOpportunitiesModule() {
        await this.click(this.opportunity);
    }

    async clickOnProductsModule() {
        await this.click(this.products);
    }


    async takeFullPageScreenshotOfHomePage() {
        await this.takeFullPageScreenshot("C:\\Users\\dell\\Desktop\\HomePage.png");
    }

    async printAllAvailableLinks(): Promise<string[]> {
        return await this.getAllTexts(this.links);

    }

    async scrollToContactsModule() {
        await this.scrollToModule(this.contactsModule);
    }



    async hoverOnAdmIcon() {
        await this.hover(this.helpAdmIcon);
    }

    async clickOnHelpLink() {
        await this.click(this.help);
    }

    async clickOnFeedbackLink() {
        await this.click(this.feedback);
    }

    async switchOnHelpWindow(index: number) {
        await this.switchOnNewWindowByIndex(index);
    }
    async switchOnFeedbackWindow(index: number) {
        await this.switchOnNewWindowByIndex(index);
    }

    async clickOnDocumentsModule() {
        await this.click(this.documents)
    }

    async switchOnHelpPageByTitle(title: string): Promise<Page> {
        return await this.switchNewOnWindowByTitle(title);
    }

    async switchOnFeedbackPageByTitle(title: string): Promise<Page> {
        return await this.switchNewOnWindowByTitle(title);
    }

    async clearEnteredFeedbackSummary() {
        await this.clearText(this.feedBackSummary);
    }

    async enterFeedbackSummary(summary: string) {
        await this.enterText(this.feedBackSummary, summary);
    }


    async enterFeedBackEmail(email: string) {
        await this.enterText(this.feedBackEmail, email);
    }
    async enterFeedBackDescription(descValue: string) {
        await this.enterText(this.feedBackDesc, descValue);
    }

    async selectFeedBackVersion(index: number) {
        await this.selectOptionByIndex(this.feedBackVersion, index);
    }

    async clickOnFeedbackSendBtn() {
        await this.click(this.feedBackSendBtn);
    }

    async takeScreenshotOfFeedbackPage(location: string) {
        await this.takeFullPageScreenshot(location);
    }

    async clickOnDltLink() {
        await this.click(this.dltLink);
    }


    async hoverOnMoreModule() {
        await this.hover(this.moreModule);
    }

    async clickOnCompaignsModule() {
        await this.click(this.compaigns);
    }









}