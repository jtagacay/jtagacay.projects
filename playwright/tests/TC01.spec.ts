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
        await iot.verifyToggleLight()
        await iot.verifyToggleRollerShades()
        await iot.verifyToggleWirelessAudio()
        await iot.verifyToggleCoffeeMaker()
    })

    test('Verify the Temperature Tab', {tag: '@P1'}, async () => {
        await iot.verifyTemperaturePower()
        await iot.dragTheTemperatureDegree(300, 65, 21)
        await iot.dragTheTemperatureDegree(200, 320, 12)
        await iot.dragTheTemperatureDegree(300, 65, 21)
        await iot.dragTheTemperatureDegree(385, 300, 30)
    })

    test('Verify the Humidity Tab', {tag: '@P1'}, async () => {
        await iot.clickHumidity()
        await iot.verifyHumidityPower()
        await iot.dragTheHumidityPercentage(300, 65, 50)
        await iot.dragTheHumidityPercentage(200, 640, 0)
        await iot.dragTheHumidityPercentage(300, 65, 50)
        await iot.dragTheHumidityPercentage(385, 640, 100)
    })

    test('Verify the Temperature Mode', {tag:'@P1'}, async () => {
        await iot.clickTemperature()
        await iot.verifyTemperatureMode()
    })
    
    test('Verify the Humidity Mode', {tag: '@P1'}, async () => {
        await iot.clickHumidity()
        await iot.verifyHumidityMode()
    })
});