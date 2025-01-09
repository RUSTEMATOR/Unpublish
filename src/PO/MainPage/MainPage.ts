import {type Locator, type Page} from "@playwright/test";
import BasePage from "../BasePage/BasePage.js";
import chalk from "chalk";


export default class MainPage extends BasePage {

    constructor(page: Page) {
        super(page);

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

    async checkMainSliderPromo({url, lang, expectedValue}:
                              {
                                  url: string, lang: string,
                                  expectedValue: string
}): Promise<{titleIsFound: boolean, receivedArray: Array<string>}> {

        await this.goTo(url)
        await this.changeLanguge(lang)
        await this.clickThroughAllBanners()
        const receivedArray = await this.getPromoMainText()
        const titleIsFound = await this.checkTitle({receivedArray, expectedValue})
        return {titleIsFound, receivedArray}
    }

    async checkMainSliderTournament({url, lang, expectedValue}:
                              {
                                  url: string, lang: string,
                                  expectedValue: string
}): Promise<{titleIsFound: boolean, receivedArray: Array<string>}> {

        await this.goTo(url)
        await this.changeLanguge(lang)
        await this.clickThroughAllBanners()
        const receivedArray = Array.from(await this.getTournamentMainText())
        const titleIsFound = await this.checkTitle({receivedArray, expectedValue})
        return {titleIsFound, receivedArray}
    }

    async checkMainSliderFooterPromo({url, lang, expectedValue}:
                              {
                                  url: string, lang: string,
                                  expectedValue: string
}): Promise<{titleIsFound: boolean, receivedArray: Array<string>}> {

        await this.goTo(url)
        await this.changeLanguge(lang)
        await this.clickThroughAllBanners()
        const receivedArray = await this.getFooterPromoTitles()
        const titleIsFound = await this.checkTitle({receivedArray, expectedValue})
        return {titleIsFound, receivedArray}
    }


    async checkPromo(
        {promoType, lang, page, expectedValue, section, url}:
            {promoType: string, lang: string, page: Page, expectedValue: string, section: string, url: string}): Promise<{titleIsFound: boolean, receivedArray: Array<string>}> {
                let receivedArray
                let titleIsFound

                await this.goTo(url)
                await this.changeLanguge(lang)
                await this.clickThroughAllBanners()
                if (section === 'mainSlider'){
                    receivedArray = await this.getPromoMainText()
                    titleIsFound = await this.checkTitle({receivedArray, expectedValue})
                    console.log(chalk.green(`${lang}\n ${promoType}\n ${receivedArray}`))
                    return {titleIsFound, receivedArray}
                } else if (section === 'footer'){
                    receivedArray = await this.getFooterPromoTitles()
                    titleIsFound = await this.checkTitle({receivedArray, expectedValue})
                    console.log(chalk.green(`${lang}\n ${promoType}\n ${receivedArray}`))
                    return {titleIsFound, receivedArray}
                }
    }
}



