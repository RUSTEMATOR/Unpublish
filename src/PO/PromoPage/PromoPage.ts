import {type Locator, Page} from "@playwright/test";
import BasePage from "../BasePage/BasePage.js";

export default class PromoPage extends BasePage{

    constructor(page: Page){
        super(page);

    }


    async getPromoCardText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.promo-item__subtitle')
            if (nodeList !== null) {
                let array = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                 if (array.length > 0) {
                    return array
                }  else {
                    throw new Error("Array is empty")
                }
            }
            return []
        })
    }

    async getTournamentPromoText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.tourn-item__subtitle')
            if (nodeList !== null) {
                let array:Array<string> = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                if (array.length > 0) {
                    return array
                }  else {
                    throw new Error("Array is empty")
                }
            }
            return []
        })
    }
}