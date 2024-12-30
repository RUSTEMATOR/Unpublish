import {test} from "@playwright/test";
import MainPage from "../src/PO/MainPage/MainPage";
import PromoPage from "../src/PO/PromoPage/PromoPage";
import {qase} from "playwright-qase-reporter";


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
        promo: 'VIP EXPRESS',
        tourn: 'HOLIDAY SPIN MANIA TOURNAMENT',
    },
    'EN-AU': 'EN',
    'EN-NZ': 'EN',
    'CA': 'EN',
    DE: {
        promo: 'VIP EXPRESS',
        tourn: 'HOLIDAY SPIN MANIA-TURNIERa',
    },
    'FR-CA': {
        promo: 'EXPRESS VIP',
        tourn: 'TOURNOI FESTIF DE LA MANIE DES TOURS',
    },
    NO: {
        promo: 'VIP-EKSPRESS',
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


test.describe('Check unpublish on the main page', () => {
    let mainPage: MainPage


   test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);

        await mainPage.goTo(mainPageLink)
        await mainPage.logIn({email: email, password: password})
   })

    for (const locale of Object.values(locales)){
        const { promo, tourn } = getPromoTournTitle(locale)

        test(`Check for the unpublished promo and tournaments in main slider banner for ${locale}`, async ({page}) => {
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

        test(`Check for the unpublished promo in the footer slider for ${locale}`, async ({page}) => {
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

})


test.describe('Check unpublish on the promo page', () => {

    let promoPage: PromoPage

    test.beforeEach(async ({page}) => {
        promoPage = new PromoPage(page);

        await promoPage.goTo(promoPageLink)
        await promoPage.logIn({email: email, password: password})

    })

    for (const locale of Object.values(locales)) {
        const { promo, tourn } = getPromoTournTitle(locale)

        test(`Check the unpublished promo on promo page for ${locale}`, async ({page}) => {
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

        test(`Check the unpublished tournament on promo page for ${locale}`, async ({page}) => {
            tag: "@tourn"
            await promoPage.changeLanguge(locale)
            await page.waitForTimeout(1000)
            const tournamentPromoText = await promoPage.getTournamentPromoText()
            const tournTitleCheck = await promoPage.checkTitle({receivedArray: tournamentPromoText, expectedValue: tourn})
            console.log(tournamentPromoText)

            await qase.comment(`
                ${tournamentPromoText}\n\n
                ${JSON.stringify(tournTitleCheck)}\n\n
            `)
        })
    }
})

test.describe('Check unpublished promo on the tournament page', () => {
    let tournamentPage: PromoPage

    test.beforeEach(async ({page}) => {
        tournamentPage = new PromoPage(page);

        await tournamentPage.goTo(tournamentPageLink)
        await tournamentPage.logIn({email: email, password: password})
    })

    for (const locale of Object.values(locales)) {
        const { promo, tourn } = getPromoTournTitle(locale)


        test(`Check the unpublished promo on tournament page for ${locale}`, async ({page}) => {
            tag: "@promo"
            await tournamentPage.changeLanguge(locale)
            await page.waitForTimeout(100)
            const promoMainText = await tournamentPage.getPromoCardText()
            const promoTitleCheck = await tournamentPage.checkTitle({receivedArray: promoMainText, expectedValue: promo})
            console.log(promoMainText)

            await qase.comment(`
                ${promoMainText}\n\n
                ${JSON.stringify(promoTitleCheck)}\n\n
            `)
        })

        test(`Check the unpublished tournament on tournament page for ${locale}`, async ({page}) => {
            tag: "@tourn"
            await tournamentPage.changeLanguge(locale)
            await page.waitForTimeout(1000)
            const tournamentPromoText = await tournamentPage.getTournamentPromoText()
            const tournTitleCheck = await tournamentPage.checkTitle({receivedArray: tournamentPromoText, expectedValue: tourn})
            console.log(tournamentPromoText)

            await qase.comment(`
                ${tournamentPromoText}\n\n
                ${JSON.stringify(tournTitleCheck)}\n\n
            `)
        })
    }
})



