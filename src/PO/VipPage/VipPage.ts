import BasePage from "../BasePage/BasePage";
import {Locator, type Page} from "@playwright/test";


export default class VipPage extends BasePage {
        vipButton: Locator
        constructor(page: Page) {
            super(page);
            this.vipButton = page.locator('#promo_promo_vip_tab')

            console.log('Vip Page');
        }

        get vipButtonElement(): Locator {
            return this.vipButton
        }
}