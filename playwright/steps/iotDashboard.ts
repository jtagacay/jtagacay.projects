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
            cardLight                   :   '//*[@ng-reflect-title="Light"]',
            cardRollerShades            :   '//*[@ng-reflect-title="Roller Shades"]',
            cardWirelessAudio           :   '//*[@ng-reflect-title="Wireless Audio"]',
            cardCoffeeMaker             :   '//*[@ng-reflect-title="Coffee Maker"]',
            tabTemperature              :   '//*[text()="Temperature"]//ancestor::li',
            tabHumidity                 :   '//*[text()="Humidity"]//ancestor::li',
            draggerTemperature          :   '//*[@tabTitle="Temperature"]//*[local-name()="circle"]',
            powerTemperature            :   '//*[@tabTitle="Temperature"]//button[contains(@class, "power-bg")]',
            valueTemperature            :   '//*[@tabTitle="Temperature"]//*[@class="slider-value-container"]',
        }
        let xpath = AppLocators[locatorName]
        // Check if the key actually exists
        if (!xpath) {
            console.log(`\n\n|================ FIND LOCATOR =====================|\n`)
            console.error(`❌ Locator name "${locatorName}" not found! Continuing...`);
            console.log(`\n|===================================================|`)
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
}
