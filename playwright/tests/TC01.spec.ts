import { test, Page, chromium } from "playwright/test";
import { reusableMethods } from "../1-global/reusableMethods";
import { iotDashboard } from "../2-actions/iotDashboard";
import { start } from "node:repl";

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
        await iot.withLogSummary('Verify the menu inside the top bar container', async () => {
            await iot.verifySidebarToggleIsVisble()
            await iot.verifyTextLogoIsVisible()
            await iot.verifyAppearanceToggleIsVisible()
            await iot.verifySearchIsVisible()
            await iot.verifyEmailIsVisible()
            await iot.verifyNotificationIsVisible()
            await iot.verifyProfileAvatarIsVisible()
            await iot.verifyProfileNameIsVisible()
        })
    })

    // test('Verify the sidebar menu when clicked', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.clickTheSideBarMenu()
    //         await iot.sideBarMenuIsNotVisible()
    //     }
    //     finally {
    //         await iot.printSummary('Verify the sidebar menu when clicked')
    //     }
    // })

    // test('Verify the Toogle Light', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.verifyLightIsVisible()
    //         await iot.verifyToggleLight()
    //         await iot.verifyToggleRollerShades()
    //         await iot.verifyToggleWirelessAudio()
    //         await iot.verifyToggleCoffeeMaker()
    //     }
    //     finally {
    //         await iot.printSummary('Verify the Toogle Light')
    //     }
    // })

    // test('Verify the Temperature Tab', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.verifyTemperaturePower()
    //         await iot.dragTheTemperatureDegree(280, 65, 21)
    //         await iot.dragTheTemperatureDegree(150, 700, 12)
    //         await iot.dragTheTemperatureDegree(300, 65, 21)
    //         await iot.dragTheTemperatureDegree(330, 600, 30)
    //     }
    //     finally {            
    //         await iot.printSummary('Verify the Temperature Tab')
    //     }
    // })

    // test('Verify the Humidity Tab', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.clickHumidity()
    //         await iot.verifyHumidityPower()
    //         await iot.dragTheHumidityPercentage(300, 60, 50)
    //         await iot.dragTheHumidityPercentage(180, 700, 0)
    //         await iot.dragTheHumidityPercentage(300, 60, 50)
    //         await iot.dragTheHumidityPercentage(385, 640, 100)
    //     }
    //     finally {
    //         await iot.printSummary('Verify the Humidity Tab')
    //     }
    // })

    // test('Verify the Temperature Mode', {tag:'@P1'}, async () => {
    //     try {
    //         await iot.clickTemperature()
    //         await iot.verifyTemperatureMode()
    //     }
    //     finally {
    //         await iot.printSummary('Verify the Temperature Mode')
    //     }
    // })
    
    // test('Verify the Humidity Mode', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.clickHumidity()
    //         await iot.verifyHumidityMode()
    //     }
    //     finally {
    //         await iot.printSummary('Verify the Humidity Mode')
    //     }
    // })

    // test('Verify the Electric Consumption', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.clickElectricConsumptionYearTab('2015')
    //         await iot.verifyElectricConsumptionList('2015')

    //         await iot.clickElectricConsumptionYearTab('2016')
    //         await iot.verifyElectricConsumptionList('2016')

    //         await iot.clickElectricConsumptionYearTab('2017')
    //         await iot.verifyElectricConsumptionList('2017')

    //         await iot.verifyElectricConsumptionConsumeAndSpent()
    //         await iot.clickElectricConsumptionDateFilter()
    //         await iot.verifyTheSelectedDates('Month')
    //         await iot.clickElectricConsumptionDateFilter()
    //         await iot.verifyTheSelectedDates('Year')
    //     }
    //     finally {            
    //         await iot.printSummary('Verify the Electric Consumption')
    //     }
    // })

    // test('Verify the Electric Consumption Graph', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.verifyIsVisibleElectricConsumptionTitle()
    //         await iot.verifyTheElectricConsumptionChart()  
    //     }
    //     finally {
    //         await iot.printSummary('Verify the Electric Consumption Graph')
    //     }
    // })

    // test('Verify the Room Management Section', {tag: '@P1'}, async () => {
    //     try {
    //         await iot.verifyRoomManagementIsVisible()
    //         await iot.verifyTheRoomsIsVisible()
    //         await iot.verifyTheRoomIsSelected()
    //     }
    //     finally {
    //         await iot.printSummary('Verify the Room Management Section')
    //     }
    // })
});