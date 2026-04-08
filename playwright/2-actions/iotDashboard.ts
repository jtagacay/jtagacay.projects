import { Locator, Page } from "playwright/test";
import { reusableMethods } from "../1-global/reusableMethods";

export class iotDashboard {
    page: Page
    rm: reusableMethods
    constructor(page: Page) {
        this.page = page
        this.rm = new reusableMethods(page)
    }

    /**
     * 
     * @param locatorName - Input the name to select element.
     * @returns 
     *      💾  This is where I store locators for the iotDashboard
     */

    private locators(locatorName: string): Locator {
        const AppLocators: Record <string, string> = {
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
            userProfileName             :   '//*[@class="fixed"]//*[contains(@class, "user-name")]',
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
        let xpath = AppLocators[locatorName]
        // Check if the key actually exists
        if (!xpath) {
            this.rm.generateConsoleLog(`Failed| Not Found| Locator name - not found Continuing...| ${locatorName}`)
            return this.page.locator(xpath);
        }
        return this.page.locator(xpath);
    }

    async verifyTextLogoIsVisible() {
        const stepsName = `Verify the Text Logo is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('textLogo'), 'Text Logo (PW-test) in the Top Bar Menu');
            await this.rm.verifyInnerTextElement(this.locators('textLogo'), 'PW-test', 'Text Logo (PW-test) in the Top Bar Menu');
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifySidebarToggleIsVisble() {
        const stepsName = `Verify the Toggle Sidebar is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('sidebarToggle'), 'Side Bar Toggle in the Top Bar Menu');
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyAppearanceToggleIsVisible() {
        const stepsName = `Verify the Select Appearance Is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('appearanceSelection'), 'Appearance Selection in the Top Bar Menu')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifySearchIsVisible() {
        const stepsName = `Verify the Search is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('searchLogo'), 'Search Logo in the Top Bar Menu');
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyEmailIsVisible() {
        const stepsName = `Verify the Email is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('emailLogo'), 'Email Logo in the Top Bar Menu')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyNotificationIsVisible() {
        const stepsName = `Verify the Notification is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('bellLogo'), 'Notification Bell Logo in the Top Bar Menu')
        }
        finally {await this.rm.printSummary(stepsName)}
    }
    
    async verifyProfileAvatarIsVisible() {
        const stepsName = `Verify the Profile Avatar is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('userAvatar'), 'Avatar of the Profile in the Top Bar Menu')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyProfileNameIsVisible() {
        const stepsName = `Verify the Profile Name is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('userProfileName'), 'User Profile Name in the Top Bar Menu')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async clickTheSideBarMenu() {
        const stepsName = `Click the Sidebar Menu`
        try {
            await this.rm.clickElement(this.locators('sidebarToggle'), 'Sidebar Menu to Show Icon only or with Title of the Category')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async sideBarMenuIsNotVisible() {
        const stepsName = `Validate the Sidebar is not Visible`
        try {
            await this.rm.verifyElementNotVisible(this.locators('menuIotDashboardText'), 'Sidebar Menu - IOT Dashboard')
            await this.rm.verifyElementNotVisible(this.locators('menuFormsText'), 'Sidebar Menu - Forms')
            await this.rm.verifyElementNotVisible(this.locators('menuModalOverlaysText'), 'Sidebar Menu - Modal Overlays')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyLightIsVisible() {
        const stepsName = `Verify the Light Card is Visible`
        try {
            await this.rm.verifyElementVisible(this.locators('cardLight'), 'The Card Light')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyToggleLight() {
        const stepsName = `Verify the Toggle of Light`
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
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyToggleRollerShades() {
        const stepName = `Verify the Toggle Roller Shades`
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
        finally {await this.rm.printSummary(stepName)}
    }
    
    // async verifyWirelessAudioOff() {
    //     const stepName = `Verify the Toggle Wireless Audio is Off`
    //     try {
    //         await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'On', 'The Wireless Audio is On')
    //     }
    //     finally {await this.rm.printSummary(stepName)}
    // }

    async verifyToggleWirelessAudio() {
        const stepName = `Verify the Toggle Wireless Audio`
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
        finally {await this.rm.printSummary(stepName)}
    }

    async verifyToggleCoffeeMaker() {
        const stepName = `Verify the Toggle Coffee Maker`
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
        finally {await this.rm.printSummary(stepName)}
    }

    async clickTemperature() {
        const stepName = `Click the Temperature tab`
        try {
            await this.rm.verifyInnerTextElement(this.locators('tabTemperature'), 'getText', 'Getting the text value of Temperature Tab')
            await this.rm.clickElement(this.locators('tabTemperature'), 'Click the Temperature tab')
        }
        finally {await this.rm.printSummary(stepName)}
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
        finally {await this.rm.printSummary(steps)}
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
        const stepName = `Verify if able to drag the Temperature Degree`
        try {
            await this.rm.dragAndDropElement(this.locators('draggerTemperature'), dragX, dragY, 'Drag the Temperature')
            await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), `${value}°`, 'Verify the expected scale value of Temperature', '::before')
        }
        finally {await this.rm.printSummary(stepName)}
    }

    async clickHumidity() {
        const stepsName = `Verify if able to click the Humidity tab`
        try {
            await this.rm.verifyInnerTextElement(this.locators('tabHumidity'), 'getText', 'Getting the text value of Humidity Tab')
            await this.rm.clickElement(this.locators('tabHumidity'), 'Click the Humidity tab')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyHumidityPower() {
        const stepsName = `Verify the Humidity Power`
        try {
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), 'getText', 'Getting the default scale value of Humidity', '::before')
            await this.rm.clickElement(this.locators('powerHumidity'), 'Click the Power of Humidity')
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), '--', 'Validated the scale value of Humidity was null')
            await this.rm.clickElement(this.locators('powerHumidity'), 'Click the Power of the Humidity')
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), 'getText', 'Validated the scale value of Temperate was not null', '::before')
        }
        finally {await this.rm.printSummary(stepsName)}
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
        const stepsName = `Verify if able to Drag the Humidity Percentage`
        try {
            await this.rm.dragAndDropElement(this.locators('draggerHumidity'), dragX, dragY, 'Drag the Humidity')
            await this.rm.verifyInnerTextElement(this.locators('valueHumidity'), `${value}%`, 'Verify the expected scale value of Humidity', '::before')
        }
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyTemperatureMode() {
        const stepsName = `Verify the Temperature Mode`
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
        finally {await this.rm.printSummary(stepsName)}
    }

    async verifyHumidityMode() {
        const stepsName = `Verify the Humidity Mode`
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
        finally {await this.rm.printSummary(stepsName)}
    }

}
