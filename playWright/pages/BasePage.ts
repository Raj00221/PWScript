import { Page, Locator, FrameLocator } from "@playwright/test";

export class BasePage {
    page: Page;  /// page -  instance variable

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * It is used to open the url
     * @param url 
     */
    async hitUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * It is used to get current page url
     * @returns url
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    /**
     * It is used to get current page title
     * @returns title
     */
    async getCurrentTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * It is used to go back from the current page
     */
    async goBackPage(): Promise<void> {
        await this.page.goBack();
    }

    /**
     * It is used to refresh the current page
     */
    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    /**
     * It is used to close the current page
     */
    async closePage(): Promise<void> {
        await this.page.close();
    }

    /**
     * It is used to click on specific element
     * @param element 
     */
    async click(element: Locator): Promise<void> {
        await element.click();
    }

    /**
     * It is used to click on element forcefully
     * @param element 
     */
    async clickForcely(element: Locator): Promise<void> {
        await element.click({ force: true });
    }

    /**
     * It is used to enter text in input field
     * @param element 
     * @param value 
     */
    async enterText(element: Locator, value: string): Promise<void> {
        await element.fill(value);
    }

    /**
     * It is used to forcefully type text in input field
     * @param locator 
     * @param text 
     */
    async type(locator: Locator, text: string): Promise<void> {
        await locator.type(text);
    }

    /**
     * It is used to enter text in input field by sequentially
     * @param element 
     * @param value 
     */
    async typeSequentially(element: Locator, value: string): Promise<void> {
        await element.pressSequentially(value);
    }

    /**
     * It is used to clear current text in input field
     * @param element 
     */
    async clearText(element: Locator): Promise<void> {
        await element.clear();
    }

    /**
     * It is used to get current value from input field
     * @param element 
     * @returns value 
     */
    async inputValue(element: Locator): Promise<string> {
        return await element.inputValue();
    }

    /**
     * It is used to get value attribute of an element
     * @param element 
     * @returns value
     */
    async getAttribute(element: Locator): Promise<string | null> {
        return await element.getAttribute("value");
    }

    /**
     * It is used to get input value of an element by JS property
     * @param element 
     * @returns 
     */

    async getInputValueJS(element: Locator): Promise<string | null> {
        return await element.evaluate((el: any) => el.value);
    }

    /**
     * It is used to get visible text on the UI
     * @param element 
     * @returns visibleText
     */
    async getVisibleText(element: Locator): Promise<string> {
        return await element.innerText();
    }

    /**
     * It is used to get all element texts
     * @param element 
     * @returns text array
     */
    async getAllTexts(element: Locator): Promise<string[]> {
        return await element.allTextContents();
    }

    /**
     * It is used to check the checkbox
     * @param element 
     */
    async check(element: Locator): Promise<void> {
        await element.check();
    }

    /**
     * It is used to uncheck the checkbox
     * @param element 
     */
    async unCheck(element: Locator): Promise<void> {
        await element.uncheck();
    }

    /**
     * It is used to hover on the element
     * @param element 
     */
    async hover(element: Locator): Promise<void> {
        await element.hover();
    }

    /**
     * It is used to drag and drop element from source to target
     * @param source
     * @param target 
     */
    async dragAndDrop(source: Locator, target: Locator): Promise<void> {
        await source.dragTo(target);
    }

    /**
     * It is used to scroll element into view
     * @param element 
     */
    async scrollIntoView(element: Locator): Promise<void> {
        await element.scrollIntoViewIfNeeded();
    }

    /**
     * It is used to double click on element
     * @param element 
     */
    async dblClick(element: Locator): Promise<void> {
        await element.dblclick();
    }

    /**
     * It is used to right click on element
     * @param element 
     */
    async rightClick(element: Locator): Promise<void> {
        await element.click({ button: 'right' });
    }

    /**
     * It is used to select option by label value
     * @param element 
     * @param labelValue 
     */
    async selectOptionByLabel(element: Locator, labelValue: string): Promise<void> {
        await element.selectOption({ label: labelValue });
    }

    /**
     * It is used to select option by value attribute
     * @param element 
     * @param valueAttValue 
     */
    async selectOptionByValue(element: Locator, valueAttValue: string): Promise<void> {
        await element.selectOption({ value: valueAttValue });
    }

    /**
     * It is used to select option by index number
     * @param element 
     * @param indexNo 
     */
    async selectOptionByIndex(element: Locator, indexNo: number): Promise<void> {
        await element.selectOption({ index: indexNo });
    }

    /**
     * It is used to take full page screenshot
     * @param location 
     */
    async takeFullPageScreenshot(location: string): Promise<void> {
        await this.page.screenshot({ path: location, fullPage: true });
    }

    /**
     * It is used to take visible page screenshot only
     * @param location 
     */
    async takeVisiblePageScreenshot(location: string): Promise<void> {
        await this.page.screenshot({ path: location, fullPage: false });
    }

    /**
     * It is used to take screenshot of specific element
     * @param element 
     * @param location 
     */
    async takeSpecificElementScreenshot(element: Locator, location: string): Promise<void> {
        await element.screenshot({ path: location });
    }

    /**
     * It is used to get element count
     * @param element 
     * @returns count
     */
    async getElementCount(element: Locator): Promise<number> {
        return await element.count();
    }

    /**
     * It is used to click element by index
     * @param element 
     * @param index 
     */
    async clickByIndex(element: Locator, index: number): Promise<void> {
        await element.nth(index).click();
    }

    /**
     * It is used to press a keyboard key
     * @param element 
     * @param key 
     */
    async press(element: Locator, key: string): Promise<void> {
        await element.press(key);
    }

    /**
     * It is used to press Enter key
     * @param element 
     */
    async pressEnter(element: Locator): Promise<void> {
        await element.press('Enter');
    }

    /**
     * It is used to press keyboard shortcut keys
     * @param element 
     * @param keys 
     */
    async pressShortcut(element: Locator, keys: string): Promise<void> {
        await element.press(keys);
    }

    /**
     * It is used to switch on iframe
     * @param frameSelector 
     * @returns FrameLocator
     */
    switchToFrame(frameSelector: string): FrameLocator {
        return this.page.frameLocator(frameSelector);
    }

    /**
     * It is used to switch to nested iframe
     * @param parentFrame 
     * @param childFrame 
     * @returns FrameLocator
     */
    switchToNestedFrame(parentFrame: string, childFrame: string): FrameLocator {
        return this.page.frameLocator(parentFrame).frameLocator(childFrame);
    }

    async acceptAlert(): Promise<void> {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
    }

    async dismissAlert(): Promise<void> {
        this.page.on('dialog', async dialog => {
            await dialog.dismiss();
        });
    }

    async acceptPrompt(text: string): Promise<void> {
        this.page.on('dialog', async dialog => {
            await dialog.accept(text);
        });
    }

    async getAlertMessage():Promise<string> {
        this.page.on('dialog', async dialog => {
            let message: string =  dialog.message();
            return message;
        });
        return " ";
    }


    async scrollBy(x: number, y: number): Promise<void> {
        await this.page.evaluate(
            ({ x, y }) => window.scrollBy(x, y),
            { x, y }
        );
    }

    async scrollToModule(element: Locator) {
        await element.scrollIntoViewIfNeeded();
    }

    async scrollByXCordYCord(deltaX: number, deltaY: number) {
        await this.page.mouse.wheel(deltaX, deltaY);
    }

    async scrollUp() {
        await this.page.mouse.up();
    }

    async scrollDown() {
        await this.page.mouse.down();
    }


    async switchOnNewWindowByIndex(index: number): Promise<Page> {
        let pages: Page[] = this.page.context().pages();
        let pg: Page = pages[index]
        return pg;
    }


    async switchNewOnWindowByUrl(expUrl: string): Promise<Page> {
        const pages = this.page.context().pages();
        for (const p of pages) {
            if ((p.url()).includes(expUrl)) {
                return p;
            }
        }
        return this.page;
    }

    async switchNewOnWindowByTitle(expTitle: string): Promise<Page> {
        const pages = this.page.context().pages();
        for (const p of pages) {
            const title = await p.title();
            if (title === expTitle) {
                console.log(p);
                return p;
            }
        }
        throw new Error("Page with given title not found");
    }

    async getPagesCount(): Promise<number> {
        return this.page.context().pages().length;
    }

}




