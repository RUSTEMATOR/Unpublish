import {Page, test, expect, Browser} from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage.js";
import PromoPage from "../../src/PO/PromoPage/PromoPage.js";
import {Ilocale} from "../../src/Interfaces.js";
import {IpromoTournTitle} from "../../src/Interfaces.js";
import {USER_ACCOUTNS} from "../../src/Data/UserAccounts.js";
import chalk from "chalk";


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
    promo: '',
    tourn: '',
    vip: ``
};

const promoTournTitle: IpromoTournTitle = {
    EN: commonPromoTournTitle,
    'EN-AU': commonPromoTournTitle,
    'EN-NZ': commonPromoTournTitle,
    'CA': commonPromoTournTitle,
    DE: {
        promo: '',
        tourn: '',
        vip: ``
    },
    'FR': {
        promo: '',
        tourn: '',
        vip: ``
    },
    NO: {
        promo: '',
        tourn: '',
        vip: ``
    }
};

async function initializePages(browser: Browser, numberOfPages: number): Promise<{pages: Page[], mainPages: MainPage[], promoPages: PromoPage[], tournamentPages: PromoPage[]}> {
    const ctx = await browser.newContext()
    const pages: Array<Page> = []
    const mainPages: Array<MainPage> = []
    const promoPages: Array<PromoPage> = []
    const tournamentPages: Array<PromoPage> = []

    for (let i = 0; i < numberOfPages; i++) {
        const page =  await ctx.newPage()
        pages.push(page)
        mainPages.push(new MainPage(page))
        promoPages.push(new PromoPage(page))
        tournamentPages.push(new PromoPage(page))
    }

    return {pages, mainPages, promoPages, tournamentPages}
}

 function logError(context: string, message: string, expected?: string, actual?: boolean){
     console.error(chalk.bgRed.whiteBright(`\n[ERROR] ${context}`))
     console.error(chalk.red(`Message: ${message}`))

     if(expected !== undefined){
         console.error(chalk.yellow(`Expected: ${expected}`))
     }

     if(actual !== undefined){
         console.error(chalk.green(`Actual: ${actual}`))
     }

     console.error(`\n`)
    }

let errorSummary: Array<string> = []

const mainPageLinkMaster = 'https://www.kingbillycasino.com/'
const promoPageLinkMaster = 'https://www.kingbillycasino.com/promotions'
const tournamentPageLinkMaster = 'https://www.kingbillycasino.com/tournaments'

const mainPageLinkBet1 = 'https://www.kingbillybet1.com/'
const promoPageLinkBet1 = 'https://www.kingbillybet1.com/promotions'
const tournamentPageLinkBet1 = 'https://www.kingbillybet1.com/tournaments'

const mainPageLinkWin = 'https://www.kingbillywin20.com/'
const promoPageLinkWin = 'https://www.kingbillywin20.com/promotions'
const tournamentPageLinkWin = 'https://www.kingbillywin20.com/tournaments'

const testDomains = [
    {domain: 'master', mainPageLink: mainPageLinkMaster, promoPageLink: promoPageLinkMaster, tournamentPageLink: tournamentPageLinkMaster},
    {domain: 'win20', mainPageLink: mainPageLinkWin, promoPageLink: promoPageLinkWin, tournamentPageLink: tournamentPageLinkWin},
    {domain: 'bet1', mainPageLink: mainPageLinkBet1, promoPageLink: promoPageLinkBet1, tournamentPageLink: tournamentPageLinkBet1},
]


testDomains.forEach(({domain, mainPageLink, promoPageLink, tournamentPageLink}) => {
    test.describe.only(`Check unpublish ${domain}`, () => {
        let pages: Page[];
        let mainPages: MainPage[];
        let promoPages: PromoPage[];
        let tournamentPages: PromoPage[]

        test.beforeEach(async ({browser}) => {
            // Initialize pages and page objects
            const result = await initializePages(browser, 22);
            pages = result.pages;
            mainPages = result.mainPages;
            promoPages = result.promoPages;
            tournamentPages = result.tournamentPages

            // Navigate to the main and promo pages
            await mainPages[0].goTo(mainPageLink);
            await mainPages[0].waitForTimeout(2000)

        });
            for (const [status, creds] of Object.entries(USER_ACCOUTNS)) {
                test(`Unpublish ${status}`, async () => {
                    // Log in with the current account
                    await mainPages[0].logIn({email: creds.email, password: creds.password});
                    await mainPages[0].closePage()

                    const localesToTestMain = [
                        {
                            lang: 'EN',
                            page: mainPages[1],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'EN-AU',
                            page: mainPages[2],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'EN-NZ',
                            page: mainPages[3],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'CA',
                            page: mainPages[4],
                            promoTitle: promoTournTitle.CA.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'DE',
                            page: mainPages[5],
                            promoTitle: promoTournTitle.DE.promo,
                            tournamentTitle: promoTournTitle.DE.tourn
                        },
                        {
                            lang: 'FR-CA',
                            page: mainPages[6],
                            promoTitle: promoTournTitle.FR.promo,
                            tournamentTitle: promoTournTitle.FR.tourn
                        },
                        {
                            lang: 'NO',
                            page: mainPages[7],
                            promoTitle: promoTournTitle.NO.promo,
                            tournamentTitle: promoTournTitle.NO.tourn
                        },
                    ];

                    const localesToTestPromo = [
                        {
                            lang: 'EN',
                            page: promoPages[8],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn,
                            vipPromoTitle: promoTournTitle.EN.vip
                        },
                        {
                            lang: 'EN-AU',
                            page: promoPages[9],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn,
                            vipPromoTitle: promoTournTitle.EN.vip
                        },
                        {
                            lang: 'EN-NZ',
                            page: promoPages[10],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn,
                            vipPromoTitle: promoTournTitle.EN.vip
                        },
                        {
                            lang: 'CA',
                            page: promoPages[11],
                            promoTitle: promoTournTitle.CA.promo,
                            tournamentTitle: promoTournTitle.EN.tourn,
                            vipPromoTitle: promoTournTitle.EN.vip
                        },
                        {
                            lang: 'DE',
                            page: promoPages[12],
                            promoTitle: promoTournTitle.DE.promo,
                            tournamentTitle: promoTournTitle.DE.tourn,
                            vipPromoTitle: promoTournTitle.DE.vip
                        },
                        {
                            lang: 'FR-CA',
                            page: promoPages[13],
                            promoTitle: promoTournTitle.FR.promo,
                            tournamentTitle: promoTournTitle.FR.tourn,
                            vipPromoTitle: promoTournTitle.FR.vip
                        },
                        {
                            lang: 'NO',
                            page: promoPages[14],
                            promoTitle: promoTournTitle.NO.promo,
                            tournamentTitle: promoTournTitle.NO.tourn,
                            vipPromoTitle: promoTournTitle.NO.vip
                        },
                    ];

                    const localesToTestTournament = [
                        {
                            lang: 'EN',
                            page: tournamentPages[15],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'EN-AU',
                            page: tournamentPages[16],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'EN-NZ',
                            page: tournamentPages[17],
                            promoTitle: promoTournTitle.EN.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'CA',
                            page: tournamentPages[18],
                            promoTitle: promoTournTitle.CA.promo,
                            tournamentTitle: promoTournTitle.EN.tourn
                        },
                        {
                            lang: 'DE',
                            page: tournamentPages[19],
                            promoTitle: promoTournTitle.DE.promo,
                            tournamentTitle: promoTournTitle.DE.tourn
                        },
                        {
                            lang: 'FR-CA',
                            page: tournamentPages[20],
                            promoTitle: promoTournTitle.FR.promo,
                            tournamentTitle: promoTournTitle.FR.tourn
                        },
                        {
                            lang: 'NO',
                            page: tournamentPages[21],
                            promoTitle: promoTournTitle.NO.promo,
                            tournamentTitle: promoTournTitle.NO.tourn
                        },
                    ];

                    const allTests = [
                        ...localesToTestMain.map(async ({lang, page, promoTitle, tournamentTitle}) => {
                            await test.step(`Checking ${lang} Main Page`, async () => {
                                await page.goTo(mainPageLink);
                                await page.waitForTimeout(2000)
                                await page.changeLanguge(lang, domain);
                                await page.clickThroughAllBanners();

                                await Promise.all([
                                    test.step('Promo Main Page Slider', async () => {
                                        console.log(chalk.yellow(`Checking Promo Main Page Slider for ${lang}`))
                                        const titleIsNotFound = await page.checkPromoTourn({
                                            promoType: 'mainSlider',
                                            lang: locales[lang],
                                            expectedValue: promoTitle,
                                            section: 'mainSlider',
                                        });

                                        if (!titleIsNotFound) {
                                            logError(
                                                `Promo Main Page Slider - ${lang}`,
                                                `Expected promo title "${promoTitle}" is found`,
                                                promoTitle,
                                                titleIsNotFound
                                            )
                                            errorSummary.push(`Promo Main Page Slider - ${lang}: ${promoTitle} is found`)
                                        } else {
                                            console.log(`Promo Main Page Slider check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFound).toEqual(true);
                                    }),

                                    test.step('Promo Main Footer', async () => {
                                        const titleIsNotFound = await page.checkPromoTourn({
                                            promoType: 'footer',
                                            lang: locales[lang],
                                            expectedValue: promoTitle,
                                            section: 'footer',
                                        });

                                        if (!titleIsNotFound) {
                                            logError(
                                                `Promo Footer - ${lang}`,
                                                `Expected promo title "${promoTitle}" is found`,
                                                promoTitle,
                                                titleIsNotFound
                                            )
                                            errorSummary.push(`Promo Footer - ${lang}: ${promoTitle} is found`)
                                        } else {
                                            console.log(`Promo Footer check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFound).toEqual(true);
                                    }),

                                    test.step('Tournament Main Page Slider', async () => {
                                        const titleIsNotFound = await page.checkPromoTourn({
                                            promoType: 'tournament',
                                            lang: locales[lang],
                                            expectedValue: tournamentTitle,
                                            section: 'tournament',
                                        });

                                        if (!titleIsNotFound) {
                                            logError(
                                                `Tournament Main Page Slider - ${lang}`,
                                                `Expected tournament title "${tournamentTitle}" is found`,
                                                tournamentTitle,
                                                titleIsNotFound
                                            )
                                            errorSummary.push(`Tournament Main Page Slider - ${lang}: ${tournamentTitle} is found`)
                                        } else {
                                            console.log(`Tournament Main Page Slider check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFound).toEqual(true);
                                    })
                                ])
                                await page.closePage()
                            })
                        }),

                        ...localesToTestPromo.map(async ({lang, page, promoTitle, tournamentTitle, vipPromoTitle}) => {
                            await test.step(`Checking ${lang} Promo and Tournament Page`, async () => {
                                await page.waitForTimeout(13000)
                                await page.goTo(promoPageLink);
                                await page.waitForTimeout(2000)
                                await page.changeLanguge(lang, domain);

                                await Promise.all([
                                    test.step('Promo Card', async () => {
                                        const titleIsNotFound = await page.checkPromoTourn({
                                            promoType: 'promo',
                                            lang: locales[lang],
                                            expectedValue: promoTitle,
                                            section: 'promo',
                                        });

                                        if (!titleIsNotFound) {
                                            logError(
                                                `Promo Promo Page - ${lang}`,
                                                `Expected promo title "${promoTitle}" is found`,
                                                promoTitle,
                                                titleIsNotFound
                                            )
                                            errorSummary.push(`Promo Promo Page - ${lang}: ${promoTitle} is found`)

                                        } else {
                                            console.log(`Promo Promo Page check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFound).toEqual(true);
                                    }),

                                    test.step('Tournament Promo', async () => {
                                        const titleIsNotFound = await page.checkPromoTourn({
                                            promoType: 'tournament',
                                            lang: locales[lang],
                                            expectedValue: tournamentTitle,
                                            section: 'tournament',
                                        });

                                        if (!titleIsNotFound) {
                                            logError(
                                                `Promo Promo Page - ${lang}`,
                                                `Expected promo title "${tournamentTitle}" is found`,
                                                tournamentTitle,
                                                titleIsNotFound
                                            )
                                            errorSummary.push(`Tournament Promo Page - ${lang}: ${tournamentTitle} is found`)

                                        } else {
                                            console.log(`Tournament Promo Page check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFound).toEqual(true);

                                    }),

                                    test.step('Check VIP promos', async () => {
                                        await page.vipButtonElement.click()

                                        await page.changeLanguge(lang, domain);
                                        const receivedArray = await page.getPromoCardText()
                                        const titleIsNotFoundVip = await page.checkTitle({
                                            receivedArray: receivedArray,
                                            expectedValue: vipPromoTitle
                                        })

                                        if (!titleIsNotFoundVip) {
                                            logError(
                                                `VIP Promo Page - ${lang}`,
                                                `Expected promo title "${vipPromoTitle}" is found`,
                                                vipPromoTitle,
                                                titleIsNotFoundVip
                                            )
                                            errorSummary.push(`VIP Promo Page - ${lang}: ${vipPromoTitle} is found`)
                                        } else {
                                            console.log(`VIP Promo Page check passed for ${lang}`)
                                        }
                                    })
                                    //@ts-ignore
                                ])
                            })
                            await page.closePage()
                        }),
                        ...localesToTestTournament.map(async ({lang, page, promoTitle, tournamentTitle}) => {
                            await test.step(`Checking ${lang} Tournament Page`, async () => {
                                await page.waitForTimeout(10000)
                                await page.goTo(tournamentPageLink);
                                await page.waitForTimeout(2000)
                                await page.changeLanguge(lang, domain);


                                await Promise.all([
                                    test.step('Tournament Page Tournament', async () => {
                                        const receivedArray = await page.getTournamentPromoText();
                                        const titleIsNotFoundTournament = await page.checkTitle({
                                            receivedArray: receivedArray,
                                            expectedValue: tournamentTitle
                                        })

                                        if (!titleIsNotFoundTournament) {
                                            logError(
                                                `Tournament Page - ${lang}`,
                                                `Expected promo title "${tournamentTitle}" is found`,
                                                tournamentTitle,
                                                titleIsNotFoundTournament
                                            )
                                            errorSummary.push(`Tournament Page - ${lang}: ${tournamentTitle} is found`)

                                        } else {
                                            console.log(`Tournament Page check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFoundTournament).toEqual(true);

                                    }),

                                    test.step('Check Promo Tournament Page', async () => {
                                        const receivedArray = await page.getPromoCardText();
                                        const titleIsNotFoundPromo = await page.checkTitle({
                                            receivedArray: receivedArray,
                                            expectedValue: promoTitle
                                        })

                                        if (!titleIsNotFoundPromo) {
                                            logError(
                                                `Tournament Page - ${lang}`,
                                                `Expected promo title "${promoTitle}" is found`,
                                                promoTitle,
                                                titleIsNotFoundPromo
                                            )
                                            errorSummary.push(`Tournament Page - ${lang}: ${promoTitle} is found`)

                                        } else {
                                            console.log(`Tournament Page check passed for ${lang}`)
                                        }

                                        expect.soft(titleIsNotFoundPromo).toEqual(true);

                                    }),
                                ])
                            })
                            await page.closePage()
                        })
                    ]
                    await Promise.all(allTests);
                })

            }


        test.afterAll(() => {
            if (errorSummary.length > 0) {
                console.log(chalk.bgRed.whiteBright('\n=== ERROR SUMMARY ==='));
                errorSummary.forEach((error, index) => {
                    console.log(chalk.red(`${index + 1}. ${error}`));
                });
            } else {
                console.log(chalk.bgGreen.whiteBright('\nAll tests passed without errors!'));
            }
        });
    })
})

