import { test, Page } from "playwright/test";
import { reusableMethods } from "../global/reusableMethods";

test.describe.serial(`TC01`, () => {
    let page: Page
    let rm: reusableMethods

    test.beforeAll(async({ browser }) => {
        const context = await browser.newContext()
        page = await browser.newPage()
        rm = new reusableMethods(page)
        await rm.goToEnvironment('test');
    })
    test('Test only', {tag: '@P1'}, async () => {
        await page.waitForTimeout(10000)
        console.log('Made it here!')
    })
});