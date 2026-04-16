import { Locator, expect, Page, PlaywrightTestConfig } from '@playwright/test';

export class reusableMethods {
    readonly page: Page
    public logBuffer: string[] = []
    constructor(page: Page) {
        this.page = page
    }

    /*  Emoji's
        ✅  |   ❌  |  📌  |  💾  | ⚠️
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
    async clickElement(locator: Locator, remarks?: string) {
        let isClicked = false
        try {
            await locator.scrollIntoViewIfNeeded()
            await locator.waitFor({state:"visible"})
            await locator.click({force: true})
            isClicked = true
        }
        catch(error) {
            isClicked = false
        }
        this.generateConsoleLog(isClicked ? `Passed| Clicked| Element - was clicked.| ${remarks}` 
            : `Failed| Clicked| Element - was not clicked. | ${remarks}`)
    }

    // ✅ To verify if the inner text is equal to the expected text
    /**
     * @param locator - input the locator
     * @param text - input a text that should be expected
     * * **Note:** Use `getText` or `notNull` if you want to get the text from innertext.
     * Otherwise, input a text
     * @param remarks - input any message or remarks or element name in this parameter 
     * @param [pseudo=""] - **OPTIONAL** only for ::before or ::after
     */
    async verifyInnerTextElement(locator: Locator, text: string, remarks?: string, pseudo: string = "") {
    const boldGreenText = '\x1b[1;32m'
    const CYAN = '\x1b[36m'
    const reset = '\x1b[0m'
    await locator.scrollIntoViewIfNeeded()
    try {
        await expect(locator).toHaveText(/.+/, {timeout: 2000})
        let innerText = await locator.evaluate((element, pseudoType) => {
            let val = element.textContent.trim()
            if (pseudoType) {
                const style = window.getComputedStyle(element, pseudoType);
                const content = style.getPropertyValue('content').replace(/['"]/g, '');
                if (content && content !== 'none') val = val + content;
            }
            return val;
        }, pseudo);
        if(text === 'getText') {
            this.generateConsoleLog(`Passed| Innertext| The innertext value of the element is ${boldGreenText}'${innerText}'${reset}`)
            return innerText
        }
        else if(text === 'notNull') {
            const isNotNull = innerText.length > 0
            this.generateConsoleLog(isNotNull ? `Passed| Innertext| The innertext of the element ${boldGreenText}'${remarks}'${reset} is not null\n • ${boldGreenText}Value:${reset} ${CYAN}'${innerText}'${reset}`
            : `Failed| Innertext| The innertext of the element ${boldGreenText}'${remarks}'${reset} was null`)
        }
        else {
            const isMatched = innerText.toLowerCase() === text.toLowerCase()
            this.generateConsoleLog(
                isMatched
                ? `Passed| Innertext| Element with the text of ${boldGreenText}'${text}'${reset} - innertext was matched. | ${remarks}`
                : `Failed| Innertext| Element - innertext did not matched. | ${remarks}`
            )
        }
    }
    catch(error) {
        console.error(error)
        this.generateConsoleLog(`Failed| Unexpected value: ${text} | ${remarks}`);
    }
}

    // ✅ To verify if the element is visible
    /**
     * @param locator - input the locator parameter
     * @param remarks - input any message or remarks or element name in this parameter
     */
    async verifyElementVisible(locator: Locator, remarks?: string) {
        try {
            await locator.scrollIntoViewIfNeeded()
            const isVisible = await locator.isVisible();
            this.generateConsoleLog(
                isVisible ? `Passed| Visible| Element - is visible.| ${remarks}`
                : `Failed| Visible| Element - is not visible.| ${remarks}`
            )
        }
        catch(error) {
            console.error(error)
            // this.generateConsoleLog(`Failed| Visible| Element - not found.| ${remarks}`)
        }
    }
    
    // ✅ To verify if the element is not visible
    /**
     * @param locator - input the locator parameter
     * @param remarks - input any message or remarks or element name in this parameter
     */
    async verifyElementNotVisible(locator:Locator, remarks?:string) {
        const isHidden = !await locator.isVisible()
        try {
            this.generateConsoleLog(
                isHidden ? `Passed| Not Visible| Element - is not visible.| ${remarks}`
                : `Failed| Not Visible| Element - is visible.| ${remarks}`
            )
        }
        catch(error) {
            console.error(error)
            // this.generateConsoleLog(`Failed| Not Visible| Element - not found.| ${remarks}`)
        }
    }

    // ✅ To verify if the attribute of the element is expected
    /**
     * @param locator - input the locator parameter
     * * * **Note:** Use `getValue` if you want to get the text from innertext.
     * Otherwise, input a text
     * @param remarks - input any message or remarks or element name in this parameter
     */

    async verifyElementAttribute(locator: Locator, attribute: string, value: string, remarks?: string) {
        await locator.scrollIntoViewIfNeeded()
        const placeholder = await locator.getAttribute(`${attribute}`)
        const boldGreenText = '\x1b[1;32m'
        const CYAN = '\x1b[36m'
        const reset = '\x1b[0m'
        try {
            if(value === 'getValue') {
                placeholder !== null
                ? this.generateConsoleLog(`Passed| Attribute| The value of the ${attribute} attribute is ${boldGreenText}'${placeholder}'${reset}| ${remarks}`)
                : this.generateConsoleLog(`Failed| Attribute| The element does not have the ${attribute} attribute.| ${remarks}`)
            }
            else {
                this.generateConsoleLog(
                    placeholder?.toLowerCase()?.includes(value.toLowerCase()) ? `Passed| Attribute| Element - attribute was matched\n ● ${boldGreenText}Attribute: ${attribute}${reset} >>> ${boldGreenText}Value: ${value}${reset}| ${remarks}`
                    : `Failed| Attribute| Element - attribute was not matched| ${remarks}`
                )
            }
        }
        catch(error) {
            console.error(error)
            // this.generateConsoleLog(`Failed| Element Not Found| Element - not found.| ${remarks}`)
        }
    }

    // ✅ To drag and drop the element
    /**
     * 
     * @param locator  - input the locator parameter
     * @param remarks - input any message or remarks or element name in the parameter
     * @param dragX - **Optional:** input the X coordinates to where you will drag the mouse.
     * @param dragY - **Optional:** input the Y coordinates to where you will drag the mouse. 
     * @param **Note:** If you are using DragX and DragY make sure you input the coordinates for both
     * @param dragTo - **Optional:** if you have locator parameter to where you will drag to
     */
    async dragAndDropElement(locator: Locator, dragX: number, dragY: number, remarks?: string, dragTo?: Locator) {
        await locator.scrollIntoViewIfNeeded()
        let curPositionX: any
        let curPositionY: any
        let newPositionX: any
        let newPositionY: any
        try {
            let position = await locator.boundingBox();
            curPositionX = position?.x
            curPositionY = position?.y

            // console.log(`${dragX} and ${dragY}`)
            if((dragX !== undefined ) && (dragY !== undefined)) {
                await locator.hover()
                await this.page.mouse.down();
                await this.page.mouse.move(dragX ?? 0, dragY ?? 0, {steps: 20});
                await this.page.mouse.up();
                await this.page.keyboard.press('Escape')
                await locator.click({force: true})
                await this.page.waitForTimeout(200)
            }
            else if(dragTo !== undefined) {
                await locator.dragTo(dragTo ?? locator)
            }
            else {
                this.generateConsoleLog(`Failed| Drag and Drop| The user did not provide the coordinates| ${remarks}`)
            }

            let newPosition = await locator.boundingBox()
            newPositionX = newPosition?.x
            newPositionY = newPosition?.y

            // console.log(`Current Position: ${curPositionX} and ${curPositionY}\nNew Position: ${newPositionX} and ${newPositionY}`)

            this.generateConsoleLog((curPositionX !== (newPositionX)) && (curPositionY !== (newPositionY)) ? `Passed| Drag and Drop| Element - was dragged| ${remarks}`
                : `Failed| Drag and Drop| Element - was not dragged| ${remarks}`)
        }
        catch(error) {
            console.error(error)
            // this.generateConsoleLog(`Failed| Element Not Found| Element - not found.| ${remarks}`)
        }
    }

    async selectElement(locator: Locator, value: string, remarks?: string) {
        await locator.scrollIntoViewIfNeeded()
        const boldGreenText = '\x1b[1;32m'
        const CYAN = '\x1b[36m'
        const reset = '\x1b[0m'

        let isSelected = false
        try {
            locator.selectOption(value)
            isSelected = true
        }
        catch(error) {
            isSelected = false
        }
        this.generateConsoleLog(isSelected ? 
            `Passed| Selection| Element with a value of ${boldGreenText}'${value}'${reset} was successfully selected'| ${remarks}` 
            : `Failed| Selection| Element with a value of ${boldGreenText}'${value}'${reset} was not selected| ${remarks}`)
    }

    /**
     * 
     * @param locator - Input the locator
     * @param xAxis - Input the X axis
     * @param yAxis - Input the Y axis
     * @param remarks - Optional: Input some remarks
     */
    async hoverElement(locator: Locator, xAxis: number, yAxis: number, remarks?: string) {
        const boldGreenText = '\x1b[1;32m'
        const CYAN = '\x1b[36m'
        const reset = '\x1b[0m'
        const box = await locator.boundingBox()
        await locator.scrollIntoViewIfNeeded()
        if(box) {
            // --- Moving the mouse
            // await this.page.mouse.move(box.x + box.width / 2, box.y / box.height / 2);
            await this.page.mouse.move(xAxis + box.width / 2, yAxis + box.height / 2)

            // --- Getting the value from tooltip
            const toolTip = locator.locator('xpath=//div[2]')
            const isVisible = await toolTip.isVisible({timeout: 3000})
            this.generateConsoleLog(isVisible ? 
                `Passed| Hovered| The element was ${CYAN}HOVERED${reset} successfully.\nThe toolTip says: ${boldGreenText}'${(await toolTip.innerText()).toString()}'${reset}\nRemarks: | ${remarks}` 
                : `Warning| Hovered| The element was ${CYAN}HOVERED${reset} successfully.\nHowever the toolTip is not visible.| ${remarks}`)
        }
        else {
            this.generateConsoleLog(`Failed| Hovered| Element - not found.| ${remarks}`)
        }
    }

    // ==============================
    // 📌 For Console Log
    // ==============================
    /**
     * 
     * @param message - Enter a message and `split the message with "| "` 
     * * 1 - Passed / Failed / Warning
     * * 2 - Title - if Clicked, Visible, InnerText, Not Visible, Not Found, Attribute, Drag and Drop etc.
     * * 3 - Message `split with " - "` 
     * * 4 - elementName / Remarks
     */
    async generateConsoleLog(response: string):Promise<String> {
        // const RED = '\x1b[31m'
        // const GREEN = '\x1b[32m'
        // const YELLOW = '\x1b[33m'
        const CYAN = '\x1b[36m'
        const RESET = '\x1b[0m'
        let setMessage: string = '';
        let [
            isSuccess,
            title, 
            message,
            remarks
            ] = response.split("| ")
        let [splitMessage1, splitMessage2] = message.split(" - ")
        let isAction = ["Clicked", "Visible", "InnerText", "Not Visible", "Not Found", "Attribute", "Drag and Drop", "Selection", "Hover"].find(word => title.toLowerCase() === (word.toLowerCase()))
        try {
            if(isSuccess === "Warning") {
                setMessage = `\n⚠️  Warning ${splitMessage1} ${CYAN}'${remarks !== undefined ? remarks : ``}'${RESET} ${splitMessage2 !== undefined ? splitMessage2 : ""}\n`
            }
            else {
                setMessage = `\n${isSuccess === "Passed" ? `✅ Passed: ` : `❌ Failed: `} ${splitMessage1} ${CYAN}'${remarks !== undefined ? remarks : ``}'${RESET} ${splitMessage2 ? splitMessage2 : ""}`;
            }
            this.logBuffer.push(setMessage)
        }
        catch(error) {
            console.error(error)
            this.logBuffer.push(`❌ Logging Error: ${error}`)
        }
        return setMessage;
    }

    async printSummary(methodName: string) {
        const YELLOW = '\x1b[33m'
        const RESET = '\x1b[0m'
        console.log(`\n${YELLOW}|>>> FINAL LOG SUMMARY FOR: ${methodName} <<<|${RESET}`)
        const fixCount = 23;
        const totalLength = methodName.length + fixCount
        const dynamicBorder = "=".repeat(totalLength)
        if(this.logBuffer.length === 0) {
            console.log(`No logs collected`)
        }
        else {
            console.log(this.logBuffer.join(''))
        }
        console.log(`\n${YELLOW}|>>> ${dynamicBorder} <<<|${RESET}\n`)
        this.logBuffer = [];
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
            console.log(`\n\n>>> ENVIRONMENT ACCESS <<<|\n`)
            console.log(`✅ Able to access the url \x1b[36m'${url.toString()}'\x1b[0m`)
            console.log(`\n|>>> =================== <<<|`)
        }
    }
}