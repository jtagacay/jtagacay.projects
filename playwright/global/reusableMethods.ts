import { Locator, expect, Page, PlaywrightTestConfig } from '@playwright/test';

export class reusableMethods {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    // ✅  To click the element
    async clickElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded()
        await locator.waitFor({state:"visible"})
        await locator.click({force: true})
        console.log(`✅  Clicked the ${locator.toString()}`)
    }

    // ✅ To verify if the inner text is equal to the expected text
    /**
     * @param text - input a text that should be expected.
     */
    async verifyInnerTextElement(locator: Locator, text: string) {
        await locator.scrollIntoViewIfNeeded()
        let innerText = locator.innerText()
        expect(innerText).toBe(text)
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
            console.log(`✅ Able to access the url ${url.toString()}`)
        }
    }
}