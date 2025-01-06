import {Page, test, expect} from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage";
import PromoPage from "../../src/PO/PromoPage/PromoPage";
import {USER_ACCOUTNS} from "../../src/Data/UserAccounts"
import {qase} from "playwright-qase-reporter";


interface Ilocale {
    [key: string]: string
}

interface IpromoTournTitle {
    [key: string]: {
        promo: string,
        tourn: string
    }
}

const locales: Ilocale = {
    'EN-AU': 'EN-AU',
    'EN-NZ': 'EN-NZ',
    'CA': 'CA',
    'EN': 'EN',
    'FR': 'FR-CA',
    'DE': 'DE',
    'NO': 'NO'
};

const commonPromoTournTitle = {
    promo: 'NEW YEAR PARTY',
    tourn: 'HOLIDAY SPIN MANIA TOURNAMENT',
};

const promoTournTitle: IpromoTournTitle = {
    EN: commonPromoTournTitle,
    'EN-AU': commonPromoTournTitle,
    'EN-NZ': commonPromoTournTitle,
    'CA': commonPromoTournTitle,
    DE: {
        promo: 'roflan gauda',
        tourn: 'HOLIDAY SPIN MANIA-TURNIER',
    },
    'FR': {
        promo: 'roflan gauda',
        tourn: 'TOURNOI FESTIF DE LA MANIE DES TOURS',
    },
    NO: {
        promo: 'roflan gauda',
        tourn: 'HOLIDAY SPIN MANIA-TURNERING',
    }
};


function getPromoTournTitle(locale: string){
    //@ts-ignore
    const title = promoTournTitle[locale]
    if (typeof title === "string"){
        //@ts-ignore
        return promoTournTitle[title]

    }
    return title

}

const email = 'samoilenkofluttershy@gmail.com'
const password = '193786Az()'
const mainPageLink = 'https://www.kingbillycasino.com/'
const promoPageLink = 'https://www.kingbillycasino.com/promotions'
const tournamentPageLink = 'https://www.kingbillycasino.com/tournaments'


test.describe.only('Check unpublish on the main page', () => {
    let mainPage0: MainPage
    let mainPage1: MainPage
    let mainPage2: MainPage
    let mainPage3: MainPage
    let mainPage4: MainPage
    let mainPage5: MainPage
    let mainPage6: MainPage
    let mainPage7: MainPage
    let page: Page[] = []
    let ctx: any
    let pageBase: Page
    let page1: Page
    let page2: Page
    let page3: Page
    let page4: Page
    let page5: Page
    let page6: Page
    let page7: Page



        test.beforeEach(async ({browser}) => {
            const array = [1, 2, 3]
            ctx = await browser.newContext()
            pageBase = await ctx.newPage()
            page1 = await ctx.newPage()
            page2 = await ctx.newPage()
            page3 = await ctx.newPage()
            page4 = await ctx.newPage()
            page5 = await ctx.newPage()
            page6 = await ctx.newPage()
            page7 = await ctx.newPage()

            mainPage0 = new MainPage(pageBase)
            mainPage1 = new MainPage(page1)
            mainPage2 = new MainPage(page2)
            mainPage3 = new MainPage(page3)
            mainPage4 = new MainPage(page4)
            mainPage5 = new MainPage(page5)
            mainPage6 = new MainPage(page6)
            mainPage7 = new MainPage(page7)

            await mainPage0.goTo(mainPageLink)
            await mainPage0.logIn({email: email, password: password})


        })



            test(`Main Slider Promo and Tournaments`, async () => {

                await Promise.all([

                    test.step('Main slider EN One Dep', async () => {
                    const enTest = await mainPage1.checkMainSlider({
                        url: mainPageLink, lang: locales["EN"], expectedValue: promoTournTitle.EN.promo
                    })
                        expect.soft(enTest, `${promoTournTitle.EN.promo} found on the page EN`).toEqual(true)
                }),

                    test.step('Main slider EN-AU One Dep', async () => {
                        const auTest = await mainPage2.checkMainSlider({
                            url: mainPageLink, lang: locales["EN-AU"], expectedValue: promoTournTitle.EN.promo
                        })
                        expect.soft(auTest, `${promoTournTitle.EN.promo} found on the page EN-AU`).toEqual(true)
                    }),

                    test.step('Main slider EN-NZ One Dep', async () => {
                        const nzTest = await mainPage3.checkMainSlider({
                            url: mainPageLink, lang: locales["EN-NZ"], expectedValue: promoTournTitle.EN.promo
                        })
                        expect.soft(nzTest, `${promoTournTitle.EN.promo} found on the page EN-NZ`).toEqual(true)
                    }),

                    test.step('Main slider CA One Dep', async () => {
                        const caTest = await mainPage4.checkMainSlider({
                            url: mainPageLink, lang: locales["CA"], expectedValue: promoTournTitle.CA.promo
                        })
                        expect.soft(caTest, `${promoTournTitle.CA.promo} found on the page EN-CA`).toEqual(true)
                    }),

                    test.step('Main slider DE One Dep', async () => {
                        const deTest = await mainPage5.checkMainSlider({
                            url: mainPageLink, lang: locales["DE"], expectedValue: promoTournTitle.DE.promo
                        })
                        expect.soft(deTest, `${promoTournTitle.DE.promo} found on the page DE`).toEqual(true)
                    }),

                    test.step('Main slider FR-CA One Dep', async () => {
                        const frTest = await mainPage6.checkMainSlider({
                            url: mainPageLink, lang: locales["FR"], expectedValue: promoTournTitle.FR.promo
                        })
                        expect.soft(frTest, `${promoTournTitle.FR.promo} found on the page FR-CA`).toEqual(true)
                    }),

                    test.step('Main slider NO One Dep', async () => {
                        const noTest = await mainPage7.checkMainSlider({
                            url: mainPageLink, lang: locales["NO"], expectedValue: promoTournTitle.NO.promo
                        })
                        expect.soft(noTest, `${promoTournTitle.NO.promo} found on the page NO`).toEqual(true)
                    })
                ])

                //
                // await qase.comment(`
                //     ${promoMainText}\n\n
                //     ${tournamentMainText}\n\n
                //     ${JSON.stringify(promoTitleCheck)}\n\n
                //     ${JSON.stringify(tournTitleCheck)}\n\n
                // `)

            })

        //     test(`Footer Slider Promo ${status} ${locale}`, async ({page}) => {
        //         tag: "@promo"
        //         await mainPage.logIn({email: creds.email, password: creds.password})
        //         await mainPage.changeLanguge(locale)
        //         const promoFooterTitles = await mainPage.getFooterPromoTitles()
        //         const promoTitleCheck = await mainPage.checkTitle({
        //             receivedArray: promoFooterTitles,
        //             expectedValue: promo
        //         })
        //         console.log(promoFooterTitles)
        //
        //         await qase.comment(`
        //             ${promoFooterTitles}\n\n
        //             ${JSON.stringify(promoTitleCheck)}\n\n
        //         `)
        //     })
        // }
        //
        //   test.afterAll(async () => {
        //     await mainPage1.closePage()
        // })
    })


test.describe('Check unpublish on the promo page', () => {

    // let promoPage: PromoPage
    //     test.beforeEach(async ({page}) => {
    //         promoPage = new PromoPage(page);
    //
    //         await promoPage.goTo(promoPageLink)
    //     })
    //
    // for (const [status, creds] of Object.entries(USER_ACCOUTNS)) {
    //     for (const locale of Object.values(locales)) {
    //
    //         test(`Promo Promo page ${status} ${locale}`, async ({page}) => {
    //             tag: "@promo"
    //             await promoPage.logIn({email: creds.email, password: creds.password})
    //             await promoPage.changeLanguge(locale)
    //             await page.waitForTimeout(100)
    //             const promoMainText = await promoPage.getPromoCardText()
    //             const promoTitleCheck = await promoPage.checkTitle({receivedArray: promoMainText, expectedValue: promo})
    //             console.log(promoMainText)
    //
    //             await qase.comment(`
    //                 ${promoMainText}\n\n
    //                 ${JSON.stringify(promoTitleCheck)}\n\n
    //             `)
    //         })
    //
    //         test(`Tournaments Promo page ${status} ${locale}`, async ({page}) => {
    //             tag: "@tourn"
    //             await promoPage.logIn({email: creds.email, password: creds.password})
    //             await promoPage.changeLanguge(locale)
    //             await page.waitForTimeout(1000)
    //             const tournamentPromoText = await promoPage.getTournamentPromoText()
    //             const tournTitleCheck = await promoPage.checkTitle({
    //                 receivedArray: tournamentPromoText,
    //                 expectedValue: tourn
    //             })
    //             console.log(tournamentPromoText)
    //
    //             await qase.comment(`
    //             ${tournamentPromoText}\n\n
    //             ${JSON.stringify(tournTitleCheck)}\n\n
    //         `)
    //         })
    //     }
    //
    // }
})

test.describe('Check unpublished promo on the tournament page', () => {
    // let tournamentPage: PromoPage
    //
    //     test.beforeEach(async ({page}) => {
    //         tournamentPage = new PromoPage(page);
    //
    //         await tournamentPage.goTo(tournamentPageLink)
    //     })
    //
    // for (const [status, creds] of Object.entries(USER_ACCOUTNS)) {
    //     for (const locale of Object.values(locales)) {
    //         const {promo, tourn} = getPromoTournTitle(locale)
    //         test(`Promo Tournament Page ${status} ${locale}`, async ({page}) => {
    //             tag: "@promo"
    //             await tournamentPage.logIn({email: creds.email, password: creds.password})
    //             await tournamentPage.changeLanguge(locale)
    //             await page.waitForTimeout(100)
    //             const promoMainText = await tournamentPage.getPromoCardText()
    //             const promoTitleCheck = await tournamentPage.checkTitle({
    //                 receivedArray: promoMainText,
    //                 expectedValue: promo
    //             })
    //             console.log(promoMainText)
    //
    //             await qase.comment(`
    //                 ${promoMainText}\n\n
    //                 ${JSON.stringify(promoTitleCheck)}\n\n
    //             `)
    //         })
    //
    //         test(`Tournament Tournament Page ${status} ${locale}`, async ({page}) => {
    //             tag: "@tourn"
    //             await tournamentPage.logIn({email: creds.email, password: creds.password})
    //             await tournamentPage.changeLanguge(locale)
    //             await page.waitForTimeout(1000)
    //             const tournamentPromoText = await tournamentPage.getTournamentPromoText()
    //             const tournTitleCheck = await tournamentPage.checkTitle({
    //                 receivedArray: tournamentPromoText,
    //                 expectedValue: tourn
    //             })
    //             console.log(tournamentPromoText)
    //
    //             await qase.comment(`
    //             ${tournamentPromoText}\n\n
    //             ${JSON.stringify(tournTitleCheck)}\n\n
    //         `)
    //         })
    //     }
    // }
})



