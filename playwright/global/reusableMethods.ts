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
     * @param elementName - input any message or remarks or element name in this parameter
     */
    async clickElement(locator: Locator, elementName: string) {
        try {
            await locator.scrollIntoViewIfNeeded()
            await locator.waitFor({state:"visible"})
            await locator.click({force: true})
            let position = await locator.boundingBox()
            console.log(`\n\n|================ CLICK ELEMENT =====================|\n`)
            console.log(`✅ Clicked the element '\x1b[36m${elementName}'\x1b[0m`)
            console.log(`✅ The element '\x1b[36m${elementName}'\x1b[0m position is on X: \x1b[33m${position?.x}\x1b[0m and Y: \x1b[33m${position?.y}\x1b[0m with W: \x1b[33m${position?.width}\x1b[0m and H: \x1b[33m${position?.height}\x1b[0m`)
            console.log(`\n|====================================================|`)
        }
        catch {
            console.log(`\n\n|================ CLICK ELEMENT =====================|\n`)
            console.log(`❌ Unable to click the element \x1b[36m'${elementName}'\x1b[0m`)
            console.log(`OR`)
            console.log(`❌ The element \x1b[36m'${elementName}'\x1b[0m not found!`)
            console.log(`\n|====================================================|`)
        }
    }

    // ✅ To verify if the inner text is equal to the expected text
    /**
     * @param locator - input the locator
     * @param text - input a text that should be expected.
     * @param elementName - input any message or remarks or element name in this parameter 
     */
    async verifyInnerTextElement(locator: Locator, text: string, elementName: string) {
        await locator.scrollIntoViewIfNeeded()
        let innerText = (await locator.innerText()).trim()
        let position = await locator.boundingBox()
        try {
            expect(innerText).toBe(text)
            console.log(`\n\n|================ VERIFY INNERTEXT =====================|\n`)
            console.log(`✅ Success: Text \x1b[36m'${text}'\x1b[0m matches in element \x1b[36m'${elementName}'\x1b[0m`)
            console.log(`✅ The element \x1b[36m'${elementName}'\x1b[0m position is on X: \x1b[33m${position?.x}\x1b[0m and Y: \x1b[33m${position?.y}\x1b[0m with W: \x1b[33m${position?.width}\x1b[0m and H: \x1b[33m${position?.height}\x1b[0m`)
            console.log(`\n|====================================================|`)
        }
        catch {
            console.log(`\n\n|================ VERIFY INNERTEXT =====================|\n`)
            console.log(`❌ Failure: Text  \x1b[36m'${text}'\x1b[0m did not match in element \x1b[36m'${elementName}'\x1b[0m`)
            console.log(`OR`)
            console.log(`❌ Element \x1b[36m'${elementName}'\x1b[0m not found!`)
            console.log(`\n|====================================================|`)
        }
    }

    // ✅ To verify if the element is visible
    /**
     * @param locator - input the locator parameter
     * @param elementName - input any message or remarks or element name in this parameter
     */
    async verifyElementVisible(locator: Locator, elementName: string) {
        try {
            await locator.scrollIntoViewIfNeeded()
            const isVisible = await locator.isVisible();
            let position = await locator.boundingBox()
            if(isVisible) {
                console.log(`\n\n|================ Element Visible =====================|\n`)
                console.log(`✅ Element \x1b[36m'${elementName}'\x1b[0m is visible`);
                console.log(`✅ The element \x1b[36m'${elementName}'\x1b[0m position is on X: \x1b[33m${position?.x}\x1b[0m and Y: \x1b[33m${position?.y}\x1b[0m with W: \x1b[33m${position?.width}\x1b[0m and H: \x1b[33m${position?.height}\x1b[0m`)
                console.log(`\n|====================================================|`)
            }
            else {
                console.log(`\n\n|================ Element Visible =====================|\n`)
                console.log(`❌ Element \x1b[36m'${elementName}'\x1b[0m is not visible`);
                console.log(`\n|====================================================|`)
            }
        }
        catch {
            console.log(`\n\n|================ Element Visible =====================|\n`)
            console.log(`❌ Element \x1b[36m'${elementName}'\x1b[0m not found!`);
            console.log(`\n|====================================================|`)
        }
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