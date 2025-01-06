import {type Locator, type Page} from "@playwright/test";
import BasePage from "../BasePage/BasePage";


export default class MainPage extends BasePage {

    constructor(page: Page) {
        super(page);

        console.log('Main Page');
    }


    async clickThroughAllBanners(): Promise<void> {
        const numberOfBanners: number = await this.page.evaluate(() => {
            // @ts-ignore
            let number: number = document.querySelector('.slick-dots').childElementCount
            return number
        })

        for (let i = 0; i < numberOfBanners; i++) {
            await this.arrowMainSlider.click()
            await this.page.waitForTimeout(1000)
        }
    }


    async getPromoMainText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('span.banner-slide__text')
            if (nodeList !== null) {
                let array = Array.from(nodeList).map(title => title.textContent?.trim().toUpperCase() || '')
                if (array.length > 0) {
                    return array
                } else {
                    throw new Error("Array is empty")
                }
            }
            return []
        })
    }

    async checkMainSlider({url, lang, expectedValue}:
                              {
                                  url: string, lang: string,
                                  expectedValue: string
}): Promise<boolean> {

        await this.goTo(url)
        await this.changeLanguge(lang)
        await this.clickThroughAllBanners()
        const receivedArray = await this.getPromoMainText()
        return await this.checkTitle({receivedArray, expectedValue})
    }
}
