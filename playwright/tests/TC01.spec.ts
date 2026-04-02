import { test, Page } from "playwright/test";
import { reusableMethods } from "../1-global/reusableMethods";
import { iotDashboard } from "../2-actions/iotDashboard";

test.describe.serial(`TC01 - IoT Dashboard`, () => {
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

    test('Verify the sidebar menu when', {tag: '@P1'}, async () => {
        await iot.clickTheSideBarMenu()
        await iot.sideBarMenuIsNotVisible()
    })

    test('Verify the Toogle Light', {tag: '@P1'}, async () => {
        await iot.verifyLightIsVisible()
        await iot.verifyLightOff()
        await iot.verifyRollerShadesOff()
        await iot.verifyWirelessAudioOff()
        await iot.verifyCoffeeMakerOff()
    })

    test('Verify the Temperature', {tag: '@P1'}, async () => {
        await iot.verifyTemperaturePower()
        await iot.dragTheTemperatureDegree(410, 320)
    })
});