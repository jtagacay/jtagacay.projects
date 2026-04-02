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
        await this.rm.verifyElementVisible(this.locators('textLogo'), 'Text Logo (PW-test) in the Top Bar Menu');
        await this.rm.verifyInnerTextElement(this.locators('textLogo'), 'PW-test', 'Text Logo (PW-test) in the Top Bar Menu');
    }

    async verifySidebarToggleIsVisble() {
        await this.rm.verifyElementVisible(this.locators('sidebarToggle'), 'Side Bar Toggle in the Top Bar Menu');
    }

    async verifyAppearanceToggleIsVisible() {
        await this.rm.verifyElementVisible(this.locators('appearanceSelection'), 'Appearance Selection in the Top Bar Menu')
    }

    async verifySearchIsVisible() {
        await this.rm.verifyElementVisible(this.locators('searchLogo'), 'Search Logo in the Top Bar Menu');
    }

    async verifyEmailIsVisible() {
        await this.rm.verifyElementVisible(this.locators('emailLogo'), 'Email Logo in the Top Bar Menu')
    }

    async verifyNotificationIsVisible() {
        await this.rm.verifyElementVisible(this.locators('bellLogo'), 'Notification Bell Logo in the Top Bar Menu')
    }
    
    async verifyProfileAvatarIsVisible() {
        await this.rm.verifyElementVisible(this.locators('userAvatar'), 'Avatar of the Profile in the Top Bar Menu')
    }

    async verifyProfileNameIsVisible() {
        await this.rm.verifyElementVisible(this.locators('userProfileName'), 'User Profile Name in the Top Bar Menu')
    }

    async clickTheSideBarMenu() {
        await this.rm.clickElement(this.locators('sidebarToggle'), 'Sidebar Menu to Show Icon only or with Title of the Category')
    }

    async sideBarMenuIsNotVisible() {
        await this.rm.verifyElementNotVisible(this.locators('menuIotDashboardText'), 'Sidebar Menu - IOT Dashboard')
        await this.rm.verifyElementNotVisible(this.locators('menuFormsText'), 'Sidebar Menu - Forms')
        await this.rm.verifyElementNotVisible(this.locators('menuModalOverlaysText'), 'Sidebar Menu - Modal Overlays')
    }

    async verifyLightIsVisible() {
        await this.rm.verifyElementVisible(this.locators('cardLight'), 'The Card Light')
    }

    async verifyLightOff() {
        await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'On', 'The Light is On')
        await this.rm.clickElement(this.locators('cardLight'), 'Switch Off the Light')
        await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'Off', 'The Light is Off')
        await this.rm.verifyElementAttribute(this.locators('cardLight'), 'class', 'Off', 'The Light is Off')
    }

    async verifyRollerShadesOff() {
        await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), 'On', 'The Roller Shades is On')
        await this.rm.clickElement(this.locators('cardRollerShades'), 'Switch Off the Roller Shades')
        await this.rm.verifyInnerTextElement(this.locators('cardRollerShadesText'), 'Off', 'The Roller Shades is Off')
        await this.rm.verifyElementAttribute(this.locators('cardRollerShades'), 'class', 'Off', 'The Roller Shades is Off')
    }
    
    async verifyWirelessAudioOff() {
        await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'On', 'The Wireless Audio is On')
        await this.rm.clickElement(this.locators('cardWirelessAudio'), 'Switch Off the Wireless Audio')
        await this.rm.verifyInnerTextElement(this.locators('cardWirelessAudioText'), 'Off', 'The Wireless Audio is Off')
        await this.rm.verifyElementAttribute(this.locators('cardWirelessAudio'), 'class', 'Off', 'The Wireless Audio is Off')
    }

    async verifyCoffeeMakerOff() {
        await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), 'On', 'The Coffee Maker is On')
        await this.rm.clickElement(this.locators('cardCoffeeMaker'), 'Switch Off the Coffee Maker')
        await this.rm.verifyInnerTextElement(this.locators('cardCoffeeMakerText'), 'Off', 'The Coffee Maker is Off')
        await this.rm.verifyElementAttribute(this.locators('cardCoffeeMaker'), 'class', 'Off', 'The Coffee Maker is Off')
    }

    async verifyTemperaturePower() {
        await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), 'getText', 'Check the Temperature have scale value')
        await this.rm.clickElement(this.locators('powerTemperature'), 'Click the Power of the Temperature')
        await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), '--', 'Check the Temperature have no scale value')
        await this.rm.clickElement(this.locators('powerTemperature'), 'Click the Power of the Temperature')
        await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), 'getText', 'Check the Temperature have scale value')
    }

    /*
        ⚠️  I will not use DragTo for now.
    */
    /**
     * 
     * @param dragX - **Optional:** input the X coordinates to where you will drag the mouse.
     * @param dragY - **Optional:** input the Y coordinates to where you will drag the mouse. 
     */
    async dragTheTemperatureDegree(dragX: number, dragY: number) {
        // await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), 'getText', 'Check the default value of the Temperature')
        await this.rm.dragAndDropElement(this.locators('draggerTemperature'), 'Drag the Temperature', dragX, dragY)
        await this.rm.verifyInnerTextElement(this.locators('valueTemperature'), '23', 'Verify the expected scale value of Temperature')
    }
}
