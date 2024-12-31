import {test} from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage";
import PromoPage from "../../src/PO/PromoPage/PromoPage";
import {qase} from "playwright-qase-reporter";
import {USER_ACCOUTNS} from "../../src/Data/UserAccounts";


const locales: object = {
    'EN-AU': 'EN-AU',
    'EN-NZ': 'EN-NZ',
    'CA': 'CA',
    'EN': 'EN',
    'FR': 'FR-CA',
    'DE': 'DE',
    'NO': 'NO'
};

const promoTournTitle: object = {
    EN: {
        promo: 'NEW YEAR PARTY',
        tourn: 'HOLIDAY SPIN MANIA TOURNAMENT',
        vip: ''
    },
    'EN-AU': 'EN',
    'EN-NZ': 'EN',
    'CA': 'EN',
    DE: {
        promo: 'NEUJAHRSPARTY',
        tourn: 'HOLIDAY SPIN MANIA-TURNIER',
        vip: ''
    },
    'FR-CA': {
        promo: 'FÊTE DU NOUVEL AN',
        tourn: 'TOURNOI FESTIF DE LA MANIE DES TOURS',
        vip: ''
    },
    NO: {
        promo: 'NYTTÅRSFEST',
        tourn: 'HOLIDAY SPIN MANIA-TURNERING',
        vip: ''
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
const password = '193786Az.'
const mainPageLink = 'https://kingbilly-staging.casino.p6m.tech/'
const promoPageLink = 'https://kingbilly-staging.casino.p6m.tech/promotions'
const tournamentPageLink = 'https://kingbilly-staging.casino.p6m.tech/tournaments'


test.describe('Check unpublish on the main page', () => {
    let mainPage: MainPage

for (const [status, creds] of Object.entries(USER_ACCOUTNS)){
   test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);

        await mainPage.goTo(mainPageLink)
        await mainPage.logIn({email: creds.email, password: creds.password})
   })

        for (const locale of Object.values(locales)) {
            const {promo, tourn} = getPromoTournTitle(locale)

            test(`Main Slider Promo and Tourn ${status} ${locale}`, async ({page}) => {
                tag: "@promo"
                await mainPage.changeLanguge(locale)
                await mainPage.clickThroughAllBanners()

                const promoMainText = await mainPage.getPromoMainText()
                const tournamentMainText = await mainPage.getTournamentMainText()
                console.log(promoMainText)
                console.log(tournamentMainText)


                const promoTitleCheck = await mainPage.checkTitle({receivedArray: promoMainText, expectedValue: promo})
                const tournTitleCheck = await mainPage.checkTitle({receivedArray: tournamentMainText, expectedValue: tourn})

                await qase.comment(`
                    ${promoMainText}\n\n
                    ${tournamentMainText}\n\n
                    ${JSON.stringify(promoTitleCheck)}\n\n
                    ${JSON.stringify(tournTitleCheck)}\n\n
                `)

            })

            test(`Footer slider${status} ${locale}`, async ({page}) => {
                tag: "@promo"
                await mainPage.changeLanguge(locale)
                const promoFooterTitles = await mainPage.getFooterPromoTitles()
                const promoTitleCheck = await mainPage.checkTitle({receivedArray: promoFooterTitles, expectedValue: promo})
                console.log(promoFooterTitles)

                await qase.comment(`
                    ${promoFooterTitles}\n\n
                    ${JSON.stringify(promoTitleCheck)}\n\n
                `)
            })

        }

    }

})


test.describe('Check unpublish on the promo page', () => {

    let promoPage: PromoPage

for (const [status, creds] of Object.entries(USER_ACCOUTNS)) {
    test.beforeEach(async ({page}) => {
        promoPage = new PromoPage(page);

        await promoPage.goTo(promoPageLink)
        await promoPage.logIn({email: creds.email, password: creds.password})

    })

        for (const locale of Object.values(locales)) {
            const {promo, tourn} = getPromoTournTitle(locale)

            test(`Promo Promo page ${status} ${locale}`, async ({page}) => {
                tag: "@promo"
                await promoPage.changeLanguge(locale)
                await page.waitForTimeout(100)
                const promoMainText = await promoPage.getPromoCardText()
                const promoTitleCheck = await promoPage.checkTitle({receivedArray: promoMainText, expectedValue: promo})
                console.log(promoMainText)

                await qase.comment(`
                        ${promoMainText}\n\n
                        ${JSON.stringify(promoTitleCheck)}\n\n
                    `)
            })

            test(`Tournament Promo Page ${status} ${locale}`, async ({page}) => {
                tag: "@tourn"
                await promoPage.changeLanguge(locale)
                await page.waitForTimeout(1000)
                const tournamentPromoText = await promoPage.getTournamentPromoText()
                const tournTitleCheck = await promoPage.checkTitle({
                    receivedArray: tournamentPromoText,
                    expectedValue: tourn
                })
                console.log(tournamentPromoText)

                await qase.comment(`
                        ${tournamentPromoText}\n\n
                        ${JSON.stringify(tournTitleCheck)}\n\n
                    `)
            })
        }
    }
})

test.describe('Check unpublished promo on the tournament page', () => {
    let tournamentPage: PromoPage


for (const [status, creds] of Object.entries(USER_ACCOUTNS)) {
        test.beforeEach(async ({page}) => {
            tournamentPage = new PromoPage(page);

            await tournamentPage.goTo(tournamentPageLink)
            await tournamentPage.logIn({email: creds.email, password: creds.password})
        })

        for (const locale of Object.values(locales)) {
            const {promo, tourn} = getPromoTournTitle(locale)


            test(`Promo Tournament Page ${status} ${locale}`, async ({page}) => {
                tag: "@promo"
                await tournamentPage.changeLanguge(locale)
                await page.waitForTimeout(100)
                const promoMainText = await tournamentPage.getPromoCardText()
                const promoTitleCheck = await tournamentPage.checkTitle({
                    receivedArray: promoMainText,
                    expectedValue: promo
                })
                console.log(promoMainText)

                await qase.comment(`
                    ${promoMainText}\n\n
                    ${JSON.stringify(promoTitleCheck)}\n\n
                `)
            })

            test(`Tournament Tournament Page ${status} ${locale}`, async ({page}) => {
                tag: "@tourn"
                await tournamentPage.changeLanguge(locale)
                await page.waitForTimeout(1000)
                const tournamentPromoText = await tournamentPage.getTournamentPromoText()
                const tournTitleCheck = await tournamentPage.checkTitle({
                    receivedArray: tournamentPromoText,
                    expectedValue: tourn
                })
                console.log(tournamentPromoText)

                await qase.comment(`
                    ${tournamentPromoText}\n\n
                    ${JSON.stringify(tournTitleCheck)}\n\n
                `)
            })
        }
    }
})

