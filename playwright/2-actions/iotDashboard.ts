import { Locator, Page } from "playwright/test";
import { reusableMethods } from "../1-global/reusableMethods";
import * as readline from 'node:readline'

export class iotDashboard {
    page: Page
    rm: reusableMethods
    constructor(page: Page) {
        this.page = page
        this.rm = new reusableMethods(page)
    }

    private months:string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    /**
     * 
     * @param locatorName - Input the name to select element.
     * @returns 
     *      💾  This is where I store locators for the iotDashboard
     */

    private locators(locatorName: string, ...params: string[]): Locator {
        const AppLocators: Record<string, string | ((...args: string[]) => string)> = {
            textLogo                    :   '//*[@class="fixed"]//*[@class="logo"]',
            sidebarToggle               :   '//*[@class="fixed"]//*[contains(@class, "sidebar-toggle")]',
            // appearanceSelectio         :   '//*[@class="fixed"]//button[@class="select-button"]',    //This is a wrong name to force failed some line (expected)
            appearanceSelection         :   '//*[@class="fixed"]//button[@class="select-button"]',  
            searchLogo                  :   '//*[contains(@class, "start-search")]',
            emailLogo                   :   '//*[@class="eva eva-email-outline"]',
            bellLogo                    :   '//*[@class="eva eva-bell-outline"]',
            userAvatar                  :   '//*[contains(@class, "user-action")]',
            userSelectProfile           :   '//*[text()="Profile"]',
            userSelectLogout            :   '//*[text()="Log out"]',
            // userProfileName             :   '//*[contains(@class,"user-action")]//div[contains(@class, "user-name")]',
            userProfileName             :   '//*[contains(@class, "user-action")]//*[text()="Nick Jones"]',
            menuIotDashboard            :   '//*[@class="menu-items"]//*[@title="IoT Dashboard"]',
            menuForms                   :   '//*[@class="menu-items"]//*[@title="Forms"]',
            menuModalOverlays           :   '//*[@class="menu-items"]//*[@title="Modal & Overlays"]',
            cardLight                   :   '//*[@ng-reflect-title="Light"]//*[local-name()="nb-card"]',
            cardRollerShades            :   '//*[@ng-reflect-title="Roller Shades"]//*[local-name()="nb-card"]',
            cardWirelessAudio           :   '//*[@ng-reflect-title="Wireless Audio"]//*[local-name()="nb-card"]',
            cardCoffeeMaker             :   '//*[@ng-reflect-title="Coffee Maker"]//*[local-name()="nb-card"]',
            tabTemperature              :   '//*[text()="Temperature"]//ancestor::li',
            tabHumidity                 :   '//*[text()="Humidity"]//ancestor::li',
            draggerTemperature          :   'nb-tab[tabTitle="Temperature"] circle',
            powerTemperature            :   '//*[@tabTitle="Temperature"]//button[contains(@class, "power-bg")]',
            valueTemperature            :   '//*[@tabTitle="Temperature"]//*[contains(@class, "h1")]',
            draggerHumidity             :   'nb-tab[tabTitle="Humidity"] circle',
            powerHumidity               :   '//*[@tabTitle="Humidity"]//button[contains(@class, "power-bg")]',
            valueHumidity               :   '//*[@tabTitle="Humidity"]//*[contains(@class, "h1")]',
            modeTemperature             :   '//*[@name="temperature-mode" and contains(@class, "ng-valid")]',
            coolTemperature             :   '//*[@name="temperature-mode"]//*[@class="nb-snowy-circled"]',
            sunnyTemperature            :   '//*[@name="temperature-mode"]//*[@class="nb-sunny-circled"]',
            flameTemperature            :   '//*[@name="temperature-mode"]//*[@class="nb-flame-circled"]',
            loopTemperature             :   '//*[@name="temperature-mode"]//*[@class="nb-loop-circled"]',
            modeHumidity                :   '//*[@name="humidity-mode" and contains(@class, "ng-valid")]',
            coolHumidity                :   '//*[@name="humidity-mode"]//*[@class="nb-snowy-circled"]',
            sunnyHumidity               :   '//*[@name="humidity-mode"]//*[@class="nb-sunny-circled"]',
            flameHumidity               :   '//*[@name="humidity-mode"]//*[@class="nb-flame-circled"]',
            loopHumidity                :   '//*[@name="humidity-mode"]//*[@class="nb-loop-circled"]',
            tabECTitle                  :   '//*[contains(text(), "Electricity Consumption")]',
            btnECTabSetYear             :   (year: string) => `//*[@class="tabset"]//*[text()="${year}"]`,
            tabElectricConsumptionYear  :   (year: string) => `//*[@ng-reflect-tab-title="${year}"]`,
            lstElectricConsumptionMonth :   (year: string, month: string) => `//*[@ng-reflect-tab-title="${year}"]//*[@role="listitem" and contains(., "${month}")]`,
            ecConsumedLabel              :   '//*[@class="stats"][1]',
            ecSpentLabel                :   '//*[@class="stats"][2]',
            ecConsumedValue             :   '//*[@class="stats"][1]//span[2]',
            ecSpentValue                :   '//*[@class="stats"][2]//span[2]',
            btnECDateFilter             :   '//*[@class="cards-container"]//button',
            ecDateFilterWeek            :   '//*[@class="option-list"]//*[@id="nb-option-0"]',
            ecDateFilterMonth           :   '//*[@class="option-list"]//*[@id="nb-option-1"]',
            ecDateFilterYear            :   '//*[@class="option-list"]//*[@id="nb-option-2"]',
            ecChart                     :   '//ngx-electricity-chart',
            roomManagement              :   '//ngx-room-selector',


            // This is text only for the sidebar menu
            menuIotDashboardText        :   '//span[text()="IoT Dashboard"]',
            menuFormsText               :   '//span[text()="Forms"]',
            menuModalOverlaysText       :   '//span[text()="Modal & Overlays"]',
            cardLightText               :   '//*[@ng-reflect-title="Light"]//*[contains(@class, "paragraph-2")]',
            cardRollerShadesText        :   '//*[@ng-reflect-title="Roller Shades"]//*[contains(@class, "paragraph-2")]',
            cardWirelessAudioText       :   '//*[@ng-reflect-title="Wireless Audio"]//*[contains(@class, "paragraph-2")]',
            cardCoffeeMakerText         :   '//*[@ng-reflect-title="Coffee Maker"]//*[contains(@class, "paragraph-2")]',

            //*[contains(@class, "status")]

        }

        const locatorDefinition = AppLocators[locatorName]
        if (!locatorDefinition) {
            this.rm.generateConsoleLog(`Failed| Not Found| Locator name - not found Continuing...| ${locatorName}`)
            return this.page.locator('')
        }

        const xpath = typeof locatorDefinition === 'function'
            ? locatorDefinition(...params)
            : locatorDefinition

        return this.page.locator(xpath)
    }

    /* Helper */
    async withLogSummary(methodName: string, testFn: () => Promise<void>) {
        try {
            await testFn()
        } finally {
            await this.printSummary(methodName)
        }
    }
    /* This is to store the logs from reusableMethods */
    // async getLogs() {
    //     console.log(`\nRetrieving logs...`)
    //     console.log(`Total logs collected: ${this.rm.logBuffer.length}`)
    //     return this.rm.logBuffer
    // }

    private logProgressInterval?: NodeJS.Timeout

    startLogProgress(methodName: string) {
        const YELLOW = '\x1b[33m'
        const RESET = '\x1b[0m'
        const dots = ['', '.', '..', '...']

        let dotIndex = 0

        this.logProgressInterval = setInterval(() => {
            const message =
                `${YELLOW}|>>> FINAL LOG SUMMARY FOR: ${methodName} | Retrieving logs${dots[dotIndex]} Total logs collected: ${this.rm.logBuffer.length} <<<|${RESET}`

            readline.clearLine(process.stderr, 0)
            readline.cursorTo(process.stderr, 0)
            process.stderr.write(message)

            dotIndex = (dotIndex + 1) % dots.length
        }, 300)
    }

    stopLogProgress() {
        if (!this.logProgressInterval) return

        clearInterval(this.logProgressInterval)
        this.logProgressInterval = undefined

        readline.clearLine(process.stderr, 0)
        readline.cursorTo(process.stderr, 0)
    }

    async getLogs() {
        return this.rm.logBuffer
    }

    /* This is to print the summary of the test case with the logs from reusableMethods */
    async printSummary(methodName: string) {
        const YELLOW = '\x1b[33m'
        const RESET = '\x1b[0m'

        const logs = await this.getLogs()

        console.log(
            `\n${YELLOW}|>>> FINAL LOG SUMMARY FOR: ${methodName} | Total logs collected: ${logs.length} <<<|${RESET}`
        )

        if (logs.length === 0) {
            console.log(`No logs collected`)
        } else {
            console.log(logs.join(''))
        }

        const fixCount = 23
        const totalLength = methodName.length + fixCount
        const dynamicBorder = '='.repeat(totalLength)

        console.log(`\n${YELLOW}|>>> ${dynamicBorder} <<<|${RESET}\n`)

        this.rm.logBuffer = []
    }

    async verifyTextLogoIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('textLogo'), 'Text Logo (PW-test) in the Top Bar Menu');
            await this.rm.verifyInnerTextElement(this.locators('textLogo'), 'PW-test', 'Text Logo (PW-test) in the Top Bar Menu');
        }
        catch (error) {
            console.log(`Text Logo is not visible in the Top Bar Menu`)
        }
    }

    async verifySidebarToggleIsVisble() {
        try {
            await this.rm.verifyElementVisible(this.locators('sidebarToggle'), 'Side Bar Toggle in the Top Bar Menu');
        }
        catch (error) {
            console.log(`Sidebar Toggle is not visible in the Top Bar Menu`)
        }
    }

    async verifyAppearanceToggleIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('appearanceSelection'), 'Appearance Selection in the Top Bar Menu')
        }
        catch (error) {
            console.log(`Appearance Selection is not visible in the Top Bar Menu`)
        }
    }

    async verifySearchIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('searchLogo'), 'Search Logo in the Top Bar Menu');
        }
        catch (error) {
            console.log(`Search Logo is not visible in the Top Bar Menu`)
        }
    }

    async verifyEmailIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('emailLogo'), 'Email Logo in the Top Bar Menu')
        }
        catch (error) {
            console.log(`Email Logo is not visible in the Top Bar Menu`)
        }
    }

    async verifyNotificationIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('bellLogo'), 'Notification Bell Logo in the Top Bar Menu')
        }
        catch (error) {
            console.log(`Notification Bell Logo is not visible in the Top Bar Menu`)
        }
    }
    
    async verifyProfileAvatarIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('userAvatar'), 'Avatar of the Profile in the Top Bar Menu')
        }
        catch (error) {
            console.log(`Avatar of the Profile is not visible in the Top Bar Menu`)
        }
    }

    async verifyProfileNameIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('userProfileName'), 'User Profile Name in the Top Bar Menu')
        }
        catch (error) {
            console.log(`User Profile Name is not visible in the Top Bar Menu`)
        }
    }

    async clickTheSideBarMenu() {
        try {
            await this.rm.clickElement(this.locators('sidebarToggle'), 'Sidebar Menu to Show Icon only or with Title of the Category')
        }
        catch (error) {
            console.log(`Failed to click the Sidebar Menu to Show Icon only or with Title of the Category`)
        }
    }

    async sideBarMenuIsNotVisible() {
        try {
            await this.rm.verifyElementIsHidden(this.locators('menuIotDashboardText'), 'Sidebar Menu - IOT Dashboard')
            await this.rm.verifyElementIsHidden(this.locators('menuFormsText'), 'Sidebar Menu - Forms')
            await this.rm.verifyElementIsHidden(this.locators('menuModalOverlaysText'), 'Sidebar Menu - Modal Overlays')
        }
        catch (error) {
            console.log(`Sidebar Menu is still visible after clicking the toggle`)
        }
    }

    async verifyLightIsVisible() {
        try {
            await this.rm.verifyElementVisible(this.locators('cardLight'), 'The Card Light')
        }
        catch (error) {
            console.log(`The Card Light is not visible`)
        }
    }

    async verifyToggleLight() {
        try {
            const getText = await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'getText', 'Getting the innertext of Light status...')
            if(getText?.toLowerCase() === 'On'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardLightText'), `${getText}`, `The Light is ${getText}`)
                await this.rm.clickElement(this.locators('cardLight'), 'Switch Off the Light')
                await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'Off', 'The Light is Off')
                await this.rm.verifyElementAttribute(this.locators('cardLight'), 'class', 'Off', 'The Light is Off')
            }
            else if(getText?.toLowerCase() === 'Off'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardLightText'), `${getText}`, `The Light is ${getText}`)
                await this.rm.clickElement(this.locators('cardLight'), 'Switch ON the Light')
                await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'On', 'The Light is ON')
                await this.rm.verifyElementAttribute(this.locators('cardLight'), 'class', 'On', 'The Light is ON')
            }
        }
        catch (error) {
            console.log(`Failed to toggle the Light`)
        }
    }

    async verifyToggleRollerShades() {
        try {
            const getText = await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), 'getText', 'Getting the innertext of Roller Shades status...')
            if(getText?.toLowerCase() === 'On'.toLowerCase()){
                await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), `${getText}`, `The Roller Shades is ${getText}`)
                await this.rm.clickElement(this.locators('cardRollerShades'), 'Switch Off the Roller Shades')
                await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), 'Off', 'The Roller Shades is Off')
                await this.rm.verifyElementAttribute(this.locators('cardRollerShades'), 'class', 'Off', 'The Roller Shades is Off')
            }
            else if (getText?.toLowerCase() === 'Off'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), `${getText}`, `The Roller Shades is ${getText}`)
                await this.rm.clickElement(this.locators('cardRollerShades'), 'Switch On the Roller Shades')
                await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), 'On', 'The Roller Shades is ON')
                await this.rm.verifyElementAttribute(this.locators('cardRollerShades'), 'class', 'On', 'The Roller Shades is ON')
            }
            else {
                this.rm.generateConsoleLog(`Failed| Unexpected value: ${getText}`)
            }
        }
        catch (error) {
            console.log(`Failed to toggle the Roller Shades`)
        }
    }
    
    // async verifyWirelessAudioOff() {
    //     const stepName = `Verify the Toggle Wireless Audio is Off`
    //     try {
    //         await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'On', 'The Wireless Audio is On')
    //     }
    //     catch (error) {}
    // }

    async verifyToggleWirelessAudio() {
        try {
            const getText = await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'getText', 'Getting the innertext of Wireless Audio status...')

            if(getText?.toLowerCase() === 'On'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), `${getText}`, `The Wireless Audio is ${getText}`)
                await this.rm.clickElement(this.locators('cardWirelessAudio'), 'Switch Off the Wireless Audio')
                await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'OFF', 'The Wireless Audio is OFF')
                await this.rm.verifyElementAttribute(this.locators('cardWirelessAudio'), 'class', 'Off', 'The Wireless Audio is OFF')
            }
            else if(getText?.toLowerCase() === 'Off'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), `${getText}`, `The Wireless Audio is ${getText}`)
                await this.rm.clickElement(this.locators('cardWirelessAudio'), 'Switch On the Wireless Audio')
                await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'ON', 'The Wireless Audio is ON')
                await this.rm.verifyElementAttribute(this.locators('cardWirelessAudio'), 'class', 'Off', 'The Wireless Audio is ON')
            }
            else {
                this.rm.generateConsoleLog(`Failed| Unexpected value: ${getText}`)
            }
        }
        catch (error) {
            console.log(`Failed to toggle the Wireless Audio`)
        }
    }

    async verifyToggleCoffeeMaker() {
        try {
            const getText = await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), 'getText', 'Getting the innertext of Coffee Maker status...')

            if(getText?.toLowerCase() === 'On'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), `${getText}`, `The Coffee Maker is ${getText}`)
                await this.rm.clickElement(this.locators('cardCoffeeMaker'), 'Switch Off the Coffee Maker')
                await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), 'Off', 'The Coffee Maker is Off')
                await this.rm.verifyElementAttribute(this.locators('cardCoffeeMaker'), 'class', 'Off', 'The Coffee Maker is Off')
            }
            else if(getText?.toLowerCase() === 'Off'.toLowerCase()) {
                await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), `${getText}`, `The Coffee Maker is ${getText}`)
                await this.rm.clickElement(this.locators('cardCoffeeMaker'), 'Switch On the Coffee Maker')
                await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), 'On', 'The Coffee Maker is On')
                await this.rm.verifyElementAttribute(this.locators('cardCoffeeMaker'), 'class', 'On', 'The Coffee Maker is On')
            }
            else {
                this.rm.generateConsoleLog(`Failed| Unexpected value: ${getText}`)
            }
            
        }
        catch (error) {
            console.log(`Failed to toggle the Coffee Maker`)
        }
    }

    async clickTemperature() {
        try {
            await this.rm.verifyInnerTextElement(this.locators('tabTemperature'), 'getText', 'Getting the text value of Temperature Tab')
            await this.rm.clickElement(this.locators('tabTemperature'), 'Click the Temperature tab')
        }
        catch (error) {}
    }

    async verifyTemperaturePower() {
        const steps = `Verify the Temperature Power`
        try {
            await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), 'getText', 'Getting the default scale value of Temperature', '::before')
            await this.rm.clickElement(this.locators('powerTemperature'), 'Click the Power of the Temperature')
            await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), '--', 'Validated the scale value of Temperature was null')
            await this.rm.clickElement(this.locators('powerTemperature'), 'Click the Power of the Temperature')
            await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), 'getText', 'Validated the scale value of Temperate was not null', '::before')
        }
        catch (error) {
            console.log(`Failed to verify the Temperature Power`)
        }
    }

    /*
        ⚠️  I will not use DragTo for now.
    */
    /**
     * 
     * @param dragX - **Optional:** input the X coordinates to where you will drag the mouse.
     * @param dragY - **Optional:** input the Y coordinates to where you will drag the mouse.
     * @param value - Input the value of the temperature
     */
    async dragTheTemperatureDegree(dragX: number, dragY: number, value: number) {
        // await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), 'getText', 'Check the default value of the Temperature')
        try {
            await this.rm.dragAndDropElement(this.locators('draggerTemperature'), dragX, dragY, 'Drag the Temperature')
            await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), `${value}°`, 'Verify the expected scale value of Temperature', '::before')
        }
        catch (error) {
            console.log(`Failed to drag the Temperature Degree to the value of ${value}°`)
        }
    }

    async clickHumidity() {
        try {
            await this.rm.verifyInnerTextElement(this.locators('tabHumidity'), 'getText', 'Getting the text value of Humidity Tab')
            await this.rm.clickElement(this.locators('tabHumidity'), 'Click the Humidity tab')
        }
        catch (error) {
            console.log(`Failed to click the Humidity Tab`)
        }
    }

    async verifyHumidityPower() {
        try {
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), 'getText', 'Getting the default scale value of Humidity', '::before')
            await this.rm.clickElement(this.locators('powerHumidity'), 'Click the Power of Humidity')
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), '--', 'Validated the scale value of Humidity was null')
            await this.rm.clickElement(this.locators('powerHumidity'), 'Click the Power of the Humidity')
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), 'getText', 'Validated the scale value of Temperate was not null', '::before')
        }
        catch (error) {
            console.log(`Failed to verify the Humidity Power`)
        }
    }

    /*
        ⚠️  I will not use DragTo for now.
    */
    /**
     * 
     * @param dragX - **Optional:** input the X coordinates to where you will drag the mouse.
     * @param dragY - **Optional:** input the Y coordinates to where you will drag the mouse.
     * @param value - Input the value of the temperature
     */

    async dragTheHumidityPercentage(dragX: number, dragY: number, value: number) {
        try {
            await this.rm.dragAndDropElement(this.locators('draggerHumidity'), dragX, dragY, 'Drag the Humidity')
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), `${value}%`, 'Verify the expected scale value of Humidity', '::before')
        }
        catch (error) {
            console.log(`Failed to drag the Humidity Percentage to the value of ${value}%`)
        }
    }

    async verifyTemperatureMode() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.clickElement(this.locators('coolTemperature'), 'Click the Cool Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeTemperature'), 'ng-reflect-model', 'cool', 'Verify the Temperate Mode should be Cool')
            await this.rm.clickElement(this.locators('sunnyTemperature'), 'Click the Warm Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeTemperature'), 'ng-reflect-model', 'warm', 'Verify the Temperate Mode should be Warm')
            await this.rm.clickElement(this.locators('flameTemperature'), 'Click the Heart Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeTemperature'), 'ng-reflect-model', 'heat', 'Verify the Temperature Mode should be Heat')
            await this.rm.clickElement(this.locators('loopTemperature'), 'Click the Fan Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeTemperature'), 'ng-reflect-model', 'fan', 'Verify the Temperature Mode should be Fan')
        }
        catch (error) {
            console.log(`Failed to verify the Temperature Mode`)
        }
    }

    async verifyHumidityMode() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.clickElement(this.locators('coolHumidity'), 'Click the Cool Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeHumidity'), 'ng-reflect-model', 'cool', 'Verify the Temperate Mode should be Cool')
            await this.rm.clickElement(this.locators('sunnyHumidity'), 'Click the Warm Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeHumidity'), 'ng-reflect-model', 'warm', 'Verify the Temperate Mode should be Warm')
            await this.rm.clickElement(this.locators('flameHumidity'), 'Click the Heart Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeHumidity'), 'ng-reflect-model', 'heat', 'Verify the Temperature Mode should be Heat')
            await this.rm.clickElement(this.locators('loopHumidity'), 'Click the Fan Temperature')
            await this.rm.verifyElementAttribute(this.locators('modeHumidity'), 'ng-reflect-model', 'fan', 'Verify the Temperature Mode should be Fan')
            
        }
        catch (error) {
            console.log(`Failed to verify the Humidity Mode`)
        }
    }

    async verifyIsVisibleElectricConsumptionTitle() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.verifyElementVisible(this.locators('tabECTitle'), 'Electric Consumption Tab title')
        }
        catch (error) {
            console.log(`Electric Consumption Tab title is not visible`)
        }
    }

    /**
     * 
     * @param year Input the year of electric consumption
     */
    async clickElectricConsumptionYearTab(year: string) {
        try {
            await this.rm.verifyInnerTextElement(this.locators('btnECTabSetYear', `${year}`), 'getText', 'Getting the tab value of the Year')
            await this.rm.clickElement(this.locators('btnECTabSetYear', `${year}`), 'Click the tab of the Year')
        }
        catch (error) {
            console.log(`Failed to click the Year tab: ${year}`)
        }
    }

    async verifyElectricConsumptionList(year: string) {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            for(const mos of this.months){

                // Created two locators for the month, one for the icon to get the attribute and the other one for the text to get the innerText value and adding extended locator...
                const locatorIcon = this.locators('lstElectricConsumptionMonth', `${year}`, `${mos}`).locator('nb-icon')
                const locatorResults = this.locators('lstElectricConsumptionMonth', `${year}`, `${mos}`).locator('.results')

                //For Log Buffer -- Getting Attribute
                this.rm.logBuffer.push(`\n>>>> GETTING THE VALUE FOR THE MONTH OF ${mos.toUpperCase()} <<<<`)
                await this.rm.verifyElementAttribute(locatorIcon, 'class', 'getValue', `Getting the Monthly Consumption Status for year ${year} and month of ${mos}`)
                //For Log Buffer -- Getting InnerText
                await this.rm.verifyInnerTextElement(locatorResults, 'getText', `Getting the Month Consumption for year ${year} and month of ${mos}`)
                this.rm.logBuffer.push('\n>>>> END <<<<\n')
            }
        }
        catch (error) {
            console.log(`Failed to verify the Electric Consumption List for the year ${year}`)
        }
    }

    async verifyElectricConsumptionConsumeAndSpent() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.verifyInnerTextElement(this.locators('ecConsumedLabel').locator('.caption').first(), 'Consumed', 'Verify if the label is expected')
            await this.rm.verifyInnerTextElement(this.locators('ecSpentLabel').locator('.caption').first(), 'Spent', 'Verify if the label is expected')
            await this.rm.verifyInnerTextElement(this.locators('ecConsumedValue'), 'notNull', 'Consumed Value')
            await this.rm.verifyInnerTextElement(this.locators('ecSpentValue'), 'notNull', 'Spent Value')
        }
        catch (error) {
            console.log(`Failed to verify the Consumed and Spent values of Electric Consumption`)
        }
    }

    async clickElectricConsumptionDateFilter() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.clickElement(this.locators('btnECDateFilter'), 'Click to select and filter from Dates')
        }
        catch (error) {
            console.log(`Failed to click the Date Filter of Electric Consumption`)
        }
    }

    async verifyTheDatesFilter() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.verifyElementVisible(this.locators('ecDateFilterWeek'), 'Verify if the WEEK is visible in the selection')
            await this.rm.verifyElementVisible(this.locators('ecDateFilterMonth'), 'Verify if the MONTH is visible in the selection')
            await this.rm.verifyElementVisible(this.locators('ecDateFilterYear'), 'Verify if the YEAR is visible in the selection')
        }
        catch (error) {
            console.log(`Failed to verify the Dates Filter options of Electric Consumption`)
        }
    }
    
    /**
     * 
     * @param value Input to select if "Week" or "Month" or "Year" to for Dates Filtering 
     */
    async verifyTheSelectedDates(value: string) {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            if(value.toLowerCase() === 'Week'.toLowerCase()) {
                await this.rm.clickElement(this.locators('ecDateFilterWeek'), `Select the ${value.toUpperCase()}`)
            }
            else if(value.toLowerCase() === 'Month'.toLowerCase()) {
                await this.rm.clickElement(this.locators('ecDateFilterMonth'), `Select the ${value.toUpperCase}`)
            }
            else if(value.toLowerCase() === 'Year'.toLowerCase()) {
                await this.rm.clickElement(this.locators('ecDateFilterYear'), `Select the ${value.toUpperCase}`)
            }
            else {
                console.log('Invalid Data for Filtering Dates...')
            }
            await this.rm.verifyInnerTextElement(this.locators('btnECDateFilter'), `${value}`, `Date Filter Selected Value`)
        }
        catch (error) {
            console.log(`Failed to select the Date Filter value of ${value}`)
        }
    }

    /**
     * 
     * @param xAxis - Input the X axis
     * @param yAxis - Input the Y axis
     */
    async verifyTheElectricConsumptionChart() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.hoverElement(this.locators('ecChart'), 700, 35.5, 'First hover to check if its working')
            await this.rm.hoverElement(this.locators('ecChart'), 1000, 35.5, 'Second hover to check if its working')
            await this.rm.hoverElement(this.locators('ecChart'), 1100, 35.5, 'Third hover to check if its working')
        }
        catch (error) {
            console.log(`Failed to hover the Electric Consumption Chart at the expected coordinates`)
        }
    }

    async verifyRoomManagementIsVisible() {
        try {
            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.verifyElementVisible(this.locators('roomManagement'), 'Verify Room Management section')
        }
        catch (error) {
            console.log(`Failed to verify the Room Management section is visible`)
        }
    }
    
    async verifyTheRoomsIsVisible() {
        try {
            await this.page.waitForLoadState('domcontentloaded')

            // -- BEDROOM
            await this.rm.verifyElementVisible(this.locators('roomManagement').locator('xpath=//*[@id="1"]'), 'BEDROOM')
            await this.rm.verifyInnerTextElement(this.locators('roomManagement').locator('xpath=//*[@id="1"]'), 'getText')

            // -- LIVING ROOM
            await this.rm.verifyElementVisible(this.locators('roomManagement').locator('xpath=//*[@id="2"]'), 'LIVING ROOM')
            await this.rm.verifyInnerTextElement(this.locators('roomManagement').locator('xpath=//*[@id="2"]'), 'getText')

            // -- KITCHEN
            await this.rm.verifyElementVisible(this.locators('roomManagement').locator('xpath=//*[@id="0"]'), 'KITCHEN')
            await this.rm.verifyInnerTextElement(this.locators('roomManagement').locator('xpath=//*[@id="0"]'), 'getText')

            // -- HALLWAY
            await this.rm.verifyElementVisible(this.locators('roomManagement').locator('xpath=//*[@id="3"]'), 'HALLWAY')
            await this.rm.verifyInnerTextElement(this.locators('roomManagement').locator('xpath=//*[@id="3"]'), 'getText')
        }
        catch (error) {
            console.log(`Failed to verify the Rooms in the Room Management section`)
        }
    }

    async verifyTheRoomIsSelected() {
        try {
            const previouslySelected = this.locators('roomManagement').locator('xpath=//*[contains(@class, "selected")]')

            await this.page.waitForLoadState('domcontentloaded')
            await this.rm.clickElement(this.locators('roomManagement').locator('xpath=//*[@id="1"]'), 'Select the BEDROOM')
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="1"]'), 'class', 'selected', 'Verify the BEDROOM is selected')
            await this.rm.clickElement(this.locators('roomManagement').locator('xpath=//*[@id="2"]'), 'Select the LIVING ROOM')
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="2"]'), 'class', 'selected', 'Verify the LIVING ROOM is selected')
            await this.rm.clickElement(this.locators('roomManagement').locator('xpath=//*[@id="0"]'), 'Select the KITCHEN')
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="0"]'), 'class', 'selected', 'Verify the KITCHEN is selected')
            await this.rm.clickElement(this.locators('roomManagement').locator('xpath=//*[@id="3"]'), 'Select the HALLWAY')
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="3"]'), 'class', 'selected', 'Verify the HALLWAY is selected')

            /*    After selecting all the rooms, I will verify if the previously selected rooms are still selected or not, because in this section you can select multiple rooms at the same time and it should keep the previous selection.    */
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="1"]'), 'class', 'selected', 'Verify the BEDROOM is still selected...')
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="2"]'), 'class', 'selected', 'Verify the LIVING is still selected...')
            await this.rm.verifyElementAttribute(this.locators('roomManagement').locator('xpath=//*[@id="0"]'), 'class', 'selected', 'Verify the KITCHEN is still selected...')

        }
        catch (error) {
            console.log(`Failed to select the Room and verify if it is selected in the Room Management section`)
        }
    }

}