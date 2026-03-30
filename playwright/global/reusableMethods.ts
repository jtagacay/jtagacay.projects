import { Locator, expect, Page, PlaywrightTestConfig } from '@playwright/test';

export class reusableMethods {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    /*  Emoji's
        ✅  |   ❌  |  📌  |  💾  |
        Use this console log to track every action
        console.log(`\n\n|================ ACTION_TYPE =====================|\n`)
        console.log(`message`);
        console.log(`\n|====================================================|`)
    */

    // ✅  To click the element
    /**
     * @param locator - input the locator parameter
     * @param remarks - input any message or remarks or element name in this parameter
     */
    async clickElement(locator: Locator, remarks: string) {
        try {
            await locator.scrollIntoViewIfNeeded()
            await locator.waitFor({state:"visible"})
            const isClicked = await locator.click({force: true})
            let position = await locator.boundingBox()
            this.generateConsoleLog(`Passed| Clicked| Element - was clicked.| ${remarks}| ${position?.x}| ${position?.y}| ${position?.width}| ${position?.height}`)
        }
        catch {
            this.generateConsoleLog(`Failed| Clicked| Element - not found. | ${remarks}`)
        }
    }

    // ✅ To verify if the inner text is equal to the expected text
    /**
     * @param locator - input the locator
     * @param text - input a text that should be expected.
     * @param remarks - input any message or remarks or element name in this parameter 
     */
    async verifyInnerTextElement(locator: Locator, text: string, remarks: string) {
        await locator.scrollIntoViewIfNeeded()
        let innerText = (await locator.innerText()).trim()
        let position = await locator.boundingBox()
        try {
            this.generateConsoleLog(
                innerText.toLowerCase() === text.toLowerCase() ? `Passed| Innertext| Element - innertext was matched.| ${remarks}| ${position?.x}| ${position?.y}| ${position?.width}| ${position?.height}`
                : `Failed| Innertext| Element - innertext did not matched.| ${remarks}|`
            )
        }
        catch {
            this.generateConsoleLog(`Failed| Innertext| Element - not found. | ${remarks}`)
        }
    }

    // ✅ To verify if the element is visible
    /**
     * @param locator - input the locator parameter
     * @param remarks - input any message or remarks or element name in this parameter
     */
    async verifyElementVisible(locator: Locator, remarks: string) {
        try {
            await locator.scrollIntoViewIfNeeded()
            const isVisible = await locator.isVisible();
            let position = await locator.boundingBox()
            this.generateConsoleLog(
                isVisible ? `Passed| Visible| Element - is visible.| ${remarks}| ${position?.x}| ${position?.y}| ${position?.width}| ${position?.height}`
                : `Failed| Visible| Element - is not visible.| ${remarks}`
            )
        }
        catch {
            this.generateConsoleLog(`Failed| Visible| Element - not found.| ${remarks}`)
        }
    }
    
    // ✅ To verify if the element is not visible
    /**
     * @param locator - input the locator parameter
     * @param remarks - input any message or remarks or element name in this parameter
     */
    async verifyElementNotVisible(locator:Locator, remarks:string) {
        const isHidden = !await locator.isVisible()
        try {
            this.generateConsoleLog(
                isHidden ? `Passed| Not Visible| Element - is not visible.| ${remarks}`
                : `Failed| Not Visible| Element - is visible.| ${remarks}`
            )
        }
        catch {
            this.generateConsoleLog(`Failed| Not Visible| Element - not found.| ${remarks}`)
        }
    }

    // ✅ To verify if the attribute of the element is expected
    /**
     * @param locator - input the locator parameter
     * @param remarks - input any message or remarks or element name in this parameter
     */

    async verifyElementAttribute(locator: Locator, attribute: string, value: string, remarks: string) {
        const placeholder = await locator.getAttribute(`${attribute}`)
        try {
            this.generateConsoleLog(
                placeholder?.toLowerCase()?.includes(value.toLowerCase()) ? `Passed| Element Attribute| Element - attribute was matched| ${remarks}`
                : `Failed| Element Attribute| Element - attribute was not matched| ${remarks}`
            )
        }
        catch {
            this.generateConsoleLog(`Failed| Element Not Found| Element - not found.| ${remarks}`)
        }
    }

    // ==============================
    // 📌 For Console Log
    // ==============================
    /**
     * 
     * @param message - Enter a message and split the message with "| " <1-Passed/Failed>  <2-message split with " - "> <3-elementName> <4-position>
     */
    async generateConsoleLog(response: string):Promise<String> {
        const RED = '\x1b[31m'
        const GREEN = '\x1b[32m'
        const YELLOW = '\x1b[33m'
        const CYAN = '\x1b[36m'
        const RESET = '\x1b[0m'
        let [
            isSuccess,
            title, 
            message,
            elementName, 
            positionX = "N/A", 
            positionY = "N/A", 
            positionWidth = "N/A", 
            positionHeight = "N/A"
            ] = response.split("| ")
        let [splitMessage1, splitMessage2] = message.split(" - ")
        let setMessage: any;
            let isAction = ["Clicked", "Visible", "InnerText", "Not Visible", "Not Found"].find(word => title.toLowerCase() === (word.toLowerCase()))
            if(positionX && positionY && positionWidth && positionHeight == "N/A") {
                setMessage = console.log(`\n\n|================ Element ${isAction} =============================|\n\n` +
                            `${isSuccess === "Passed" ? `✅ Passed: ` : `❌ Failed: `} ${splitMessage1} ${CYAN}'${elementName}'${RESET} ${splitMessage2}\n\n` +
                            `|============================================================|`);
            }
            else {
                setMessage = console.log(`\n\n|================ Element ${isAction} =============================|\n\n` +
                            `${isSuccess === "Passed" ? `✅ Passed: ` : `❌ Failed: `} ${CYAN}${splitMessage1} ${elementName} ${splitMessage2}${RESET}\n` +
                            `The Element ${CYAN}'${elementName}'${RESET} is on position of X: ${YELLOW}${positionX}${RESET} and Y: ${YELLOW}${positionY}${RESET} with W: ${YELLOW}${positionWidth}${RESET} and H: ${YELLOW}${positionHeight}${RESET}\n\n` +
                            `|==============================================================|`);
            }
        return setMessage;
    }

    // ==============================
    // 📌 Environment Helper
    // ==============================

    /**
        @param env - select "test" if http://localhost:4200/
    */
    async goToEnvironment(env: string) {
        const envUrls: Record<string, string> = {
            test    :   'http://localhost:4200/',
        }
        const url = envUrls[env.toLowerCase()]
        if(!url) {
            throw new Error("Unknown Environment");
        }
        else {
            // Add this object for ad block
            await this.page.route('**/*', route => {
            const reqUrl = route.request().url();
            const adBlockList = [
                    'googleads', 'g.doubleclick', 'googlesyndication',
                    'adservice', 'analytics', 'facebook.com/tr'
                ];
                if(adBlockList.some(ad => reqUrl.includes(ad))) {
                    return route.abort();
                }
                return route.continue();
            });
            await this.page.goto(url, {timeout: 60000, waitUntil: 'domcontentloaded'})
            console.log(`\n\n|================ ENVIRONMENT ACCESS =====================|\n`)
            console.log(`✅ Able to access the url \x1b[36m'${url.toString()}'\x1b[0m`)
            console.log(`\n|====================================================|`)
        }
    }
}