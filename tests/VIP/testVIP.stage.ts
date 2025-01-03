import {test} from "@playwright/test";
import VipPage from "../../src/PO/VipPage/VipPage";
import {STAGE_USER_ACCOUTNS, USER_ACCOUTNS, VIP_ONLY_STAGE} from "../../src/Data/UserAccounts";


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

const vipPageUrl = 'https://kingbilly-staging.casino.p6m.tech/promotions?vip'


test.describe('Vip page unpublish test', () => {
    let vipPage: VipPage

    test.beforeEach(async ({page}) => {
        vipPage = new VipPage(page);

       await vipPage.goTo(vipPageUrl)
    })

    for (const [status, creds] of Object.entries(VIP_ONLY_STAGE)) {
        for (const locale of Object.values(locales)) {
            const {promo} = getPromoTournTitle(locale)

            test(`Vip Page Promo ${locale} ${status}`, async () => {
                await vipPage.logIn({email: creds.email, password: creds.password})
                await vipPage.changeLanguge(locale)
                await vipPage.vipButtonElement.click()

                const vipPromoTitles = await vipPage.getFooterPromoTitles()
                console.log(vipPromoTitles)
                const vipTitleCheck = await vipPage.checkTitle({receivedArray: vipPromoTitles, expectedValue: promo})
            })
        }
    }
})