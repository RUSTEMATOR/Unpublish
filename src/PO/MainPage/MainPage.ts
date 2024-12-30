import {type Locator, type Page} from "@playwright/test";


export default class MainPage {
    page: Page
    private logInButton: Locator
    private emailField: Locator
    private paswordField: Locator
    private submitBtn: Locator
    private langdropdown: Locator
    private arrowMainSlider: Locator
    private langItem: (langValue: string) => Locator

    constructor(page: Page) {
        this.page = page;
        this.logInButton = page.locator('.header__button--sign-in')
        this.emailField = page.locator('#login_modal_email_input')
        this.paswordField = page.locator('#login_password_input')
        this.submitBtn = page.locator('#submit_login')
        this.langdropdown = page.locator('.header .select-language-icons-with-code__button')
        this.arrowMainSlider = page.locator('#arrow_main_slider_left')
        this.langItem = (langValue) => page.locator('.header .select-language-icons-with-code__item', {'hasText': `${langValue}`}).first()

        console.log('Main Page');
    }


    async goTo(url: string): Promise<void> {
        await this.page.goto(url)
    }

    async logIn({email, password}: {email: string, password: string}): Promise<void> {
        await this.logInButton.click()
        await this.emailField.fill(email)
        await this.paswordField.fill(password)
        await this.submitBtn.click()
        console.log('Logged in successfully')
        await this.page.waitForSelector('#header_dep_btn')
    }

    async changeLanguge(langValue: string): Promise<void> {
        const currentLocale = await this.langdropdown.innerText()
        
        if (currentLocale === langValue) {
            console.log(`Language is already set to ${langValue}`)
            return
        } else {
            await this.langdropdown.click()
            await this.langItem(langValue).innerText()
            await this.langItem(langValue).click()
            console.log(`Language changed to ${langValue}`)
        }

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

   async checkTitle({
    receivedArray,
    expectedValue
}: {
    receivedArray: Array<string>,
    expectedValue: string
}): Promise<{ message: string, error?: Error }> {

    if (receivedArray.includes(expectedValue)) {
        throw new Error(`${expectedValue} found on the page`);
        // return { message: error.message, error };
    } else {
        const message = `No ${expectedValue} found`;
        console.log(message);
        return { message };
    }
}


    async getPromoMainText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('span.banner-slide__text')
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

    async getTournamentMainText(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.tourn-banner .tourn-banner__subtitle')
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

    async getFooterPromoTitles(): Promise<Array<string>> {
        return await this.page.evaluate(async () => {
            let nodeList = document.querySelectorAll('.promo-item__subtitle')
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