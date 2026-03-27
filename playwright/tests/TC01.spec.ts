import { test, Page } from "playwright/test";
import { reusableMethods } from "../global/reusableMethods";
import { iotDashboard } from "../steps/iotDashboard";

test.describe.serial(`TC01`, () => {
    let page: Page
    let rm: reusableMethods
    let iot: iotDashboard

    test.beforeAll(async({ browser }) => {
        const context = await browser.newContext()
        page = await browser.newPage()
        rm = new reusableMethods(page)
        iot = new iotDashboard(page)
        await rm.goToEnvironment('test');
    })
    test('Verify the menu inside the top bar container', {tag: '@P1'}, async () => {
        await iot.verifySidebarToggleIsVisble();
        await iot.verifyTextLogoIsVisible()
        await iot.verifyAppearanceToggleIsVisible()
        await iot.verifySearchIsVisible()
        await iot.verifyEmailIsVisible()
        await iot.verifyNotificationIsVisible()
        await iot.verifyProfileAvatarIsVisible()
        await iot.verifyProfileNameIsVisible()
    })
});