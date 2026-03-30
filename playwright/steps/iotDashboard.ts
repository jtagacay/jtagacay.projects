import { Locator, Page } from "playwright/test";
import { reusableMethods } from "../global/reusableMethods";

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
            appearanceSelectio         :   '//*[@class="fixed"]//button[@class="select-button"]',    //This is a wrong name to force failed some line (expected)
            // appearanceSelection         :   '//*[@class="fixed"]//button[@class="select-button"]',  
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
            draggerTemperature          :   '//*[@tabTitle="Temperature"]//*[local-name()="circle"]',
            powerTemperature            :   '//*[@tabTitle="Temperature"]//button[contains(@class, "power-bg")]',
            valueTemperature            :   '//*[@tabTitle="Temperature"]//*[@class="slider-value-container"]',

            // This is text only for the sidebar menu
            menuIotDashboardText        :   '//span[text()="IoT Dashboard"]',
            menuFormsText               :   '//span[text()="Forms"]',
            menuModalOverlaysText       :   '//span[text()="Modal & Overlays"]',
            cardLightText               :   '//*[@ng-reflect-title="Light"]//*[contains(@class, "paragraph-2")]',

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
        await this.page.waitForLoadState('domcontentloaded');
        await this.rm.verifyElementVisible(this.locators('textLogo'), 'Text Logo (PW-test) in the Top Bar Menu');
        await this.rm.verifyInnerTextElement(this.locators('textLogo'), 'PW-test', 'Text Logo (PW-test) in the Top Bar Menu');
    }

    async verifySidebarToggleIsVisble() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.rm.verifyElementVisible(this.locators('sidebarToggle'), 'Side Bar Toggle in the Top Bar Menu');
    }

    async verifyAppearanceToggleIsVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementVisible(this.locators('appearanceSelection'), 'Appearance Selection in the Top Bar Menu')
    }

    async verifySearchIsVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementVisible(this.locators('searchLogo'), 'Search Logo in the Top Bar Menu');
    }

    async verifyEmailIsVisible() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.rm.verifyElementVisible(this.locators('emailLogo'), 'Email Logo in the Top Bar Menu')
    }

    async verifyNotificationIsVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementVisible(this.locators('bellLogo'), 'Notification Bell Logo in the Top Bar Menu')
    }
    
    async verifyProfileAvatarIsVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementVisible(this.locators('userAvatar'), 'Avatar of the Profile in the Top Bar Menu')
    }

    async verifyProfileNameIsVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementVisible(this.locators('userProfileName'), 'User Profile Name in the Top Bar Menu')
    }

    async clickTheSideBarMenu() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.clickElement(this.locators('sidebarToggle'), 'Sidebar Menu to Show Icon only or with Title of the Category')
    }

    async sideBarMenuIsNotVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementNotVisible(this.locators('menuIotDashboardText'), 'Sidebar Menu - IOT Dashboard')
        await this.rm.verifyElementNotVisible(this.locators('menuFormsText'), 'Sidebar Menu - Forms')
        await this.rm.verifyElementNotVisible(this.locators('menuModalOverlaysText'), 'Sidebar Menu - Modal Overlays')
    }

    async verifyLightIsVisible() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyElementVisible(this.locators('cardLight'), 'The Card Light')
    }

    async verifyIsLightOnOrOff() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'On', 'The Light is On')
        await this.rm.clickElement(this.locators('cardLight'), 'Switch Light to Off')
        await this.rm.verifyInnerTextElement(this.locators('cardLightText'), 'Off', 'The Light is Off')
        await this.rm.verifyElementAttribute(this.locators('cardLight'), 'class', 'Off', 'The Light is Off')
    }
}
