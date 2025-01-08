import {type Locator, type Page} from "@playwright/test";


export default class BasePage {
    protected page: Page;
    protected logInButton: Locator;
    protected emailField: Locator;
    protected passwordField: Locator;
    protected submitBtn: Locator;
    protected langDropdown: Locator;
    protected arrowMainSlider: Locator;
    protected langItem: (langValue: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.logInButton = page.locator('.header__button--sign-in')
        this.emailField = page.locator('#login_modal_email_input')
        this.passwordField = page.locator('#login_password_input')
        this.submitBtn = page.locator('#submit_login')
        this.langDropdown = page.locator('.header .select-language-icons-with-code__button')
        this.arrowMainSlider = page.locator('#arrow_main_slider_left')
        this.langItem = (langValue) => page.locator('.header .select-language-icons-with-code__item', {'hasText': `${langValue}`}).first()
    }


    async goTo(url: string): Promise<void> {
        await this.page.goto(url)
    }

    async logIn({email, password}: {email: string, password: string}): Promise<void> {
        await this.logInButton.click()
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.submitBtn.click()
        console.log('Logged in successfully')
        await this.page.waitForSelector('#header_dep_btn')
    }

    async changeLanguge(langValue: string): Promise<void> {
        const currentLocale = await this.langDropdown.innerText()

        if (currentLocale === langValue) {
            console.log(`Language is already set to ${langValue}`)
            return
        } else {
            await this.langDropdown.click()
            await this.langItem(langValue).innerText()
            await this.langItem(langValue).click()
            console.log(`Language changed to ${langValue}`)
        }

    }



   async checkTitle({
    receivedArray,
    expectedValue
}: {
    receivedArray: Array<string>,
    expectedValue: string
}): Promise<boolean> {

    if (receivedArray.includes(expectedValue.toUpperCase())) {
       return false
    } else {
        const message = `No ${expectedValue} found`;
        console.log(message);
        return true
    }
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

    async closePage(): Promise<void> {
        await this.page.close()
        console.log('Page closed')
    }

    async waitForTimeout(timeout: number): Promise<void> {
        await this.page.waitForTimeout(timeout)
    }

}