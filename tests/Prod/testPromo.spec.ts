import {Page, test, expect, Browser} from "@playwright/test";
import MainPage from "../../src/PO/MainPage/MainPage.js";
import PromoPage from "../../src/PO/PromoPage/PromoPage.js";
import VipPage from "../../src/PO/VipPage/VipPage.js";
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
    promo: 'NEW YEAR PARTY',
    tourn: '',
};

const promoTournTitle: IpromoTournTitle = {
    EN: commonPromoTournTitle,
    'EN-AU': commonPromoTournTitle,
    'EN-NZ': commonPromoTournTitle,
    'CA': commonPromoTournTitle,
    DE: {
        promo: 'Drehen Sie Ihre Woche',
        tourn: 'HOLIDAY SPIN MANIA-TURNIER',
    },
    'FR': {
        promo: 'roflan gauda',
        tourn: 'TOURNOI FESTIF DE LA MANIE DES TOURS',
    },
    NO: {
        promo: 'roflan gauda',
        tourn: '',
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

const mainPageLink = 'https://www.kingbillycasino.com/'
const promoPageLink = 'https://www.kingbillycasino.com/promotions'
const tournamentPageLink = 'https://www.kingbillycasino.com/tournaments'


test.describe.only('Check unpublish on the main page', () => {
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

    });

    for (const [status, creds] of Object.entries(USER_ACCOUTNS)) {
        test(`Main Page Slider Promo ${status}`, async () => {
            // Log in with the current account
            await mainPages[0].logIn({email: creds.email, password: creds.password});
            await mainPages[0].closePage()

            const localesToTestMain = [
                { lang: 'EN', page: mainPages[1], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'EN-AU', page: mainPages[2], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'EN-NZ', page: mainPages[3], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'CA', page: mainPages[4], promoTitle: promoTournTitle.CA.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'DE', page: mainPages[5], promoTitle: promoTournTitle.DE.promo, tournamentTitle: promoTournTitle.DE.tourn },
                { lang: 'FR-CA', page: mainPages[6], promoTitle: promoTournTitle.FR.promo, tournamentTitle: promoTournTitle.FR.tourn },
                { lang: 'NO', page: mainPages[7], promoTitle: promoTournTitle.NO.promo, tournamentTitle: promoTournTitle.NO.tourn },
            ];

            const localesToTestPromo = [
                { lang: 'EN', page: promoPages[8], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'EN-AU', page: promoPages[9], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'EN-NZ', page: promoPages[10], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'CA', page: promoPages[11], promoTitle: promoTournTitle.CA.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'DE', page: promoPages[12], promoTitle: promoTournTitle.DE.promo, tournamentTitle: promoTournTitle.DE.tourn },
                { lang: 'FR-CA', page: promoPages[13], promoTitle: promoTournTitle.FR.promo, tournamentTitle: promoTournTitle.FR.tourn },
                { lang: 'NO', page: promoPages[14], promoTitle: promoTournTitle.NO.promo, tournamentTitle: promoTournTitle.NO.tourn },
            ];

            const localesToTestTournament = [
                { lang: 'EN', page: tournamentPages[15], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'EN-AU', page: tournamentPages[16], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'EN-NZ', page: tournamentPages[17], promoTitle: promoTournTitle.EN.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'CA', page: tournamentPages[18], promoTitle: promoTournTitle.CA.promo, tournamentTitle: promoTournTitle.EN.tourn },
                { lang: 'DE', page: tournamentPages[19], promoTitle: promoTournTitle.DE.promo, tournamentTitle: promoTournTitle.DE.tourn },
                { lang: 'FR-CA', page: tournamentPages[20], promoTitle: promoTournTitle.FR.promo, tournamentTitle: promoTournTitle.FR.tourn },
                { lang: 'NO', page: tournamentPages[21], promoTitle: promoTournTitle.NO.promo, tournamentTitle: promoTournTitle.NO.tourn },
            ];

            const allTests = [
                ...localesToTestMain.map(async ({lang, page, promoTitle, tournamentTitle}) => {
                    await test.step(`Checking ${lang} Main Page`, async () => {
                        await page.goTo(mainPageLink);
                        await page.changeLanguge(lang);
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

                                if(!titleIsNotFound){
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

                                if(!titleIsNotFound){
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

                                 if(!titleIsNotFound){
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

                ...localesToTestPromo.map(async ({lang, page, promoTitle, tournamentTitle}) => {
                    await test.step(`Checking ${lang} Promo and Tournament Page`, async () => {
                        await page.waitForTimeout(13000)
                        await page.goTo(promoPageLink);
                        await page.changeLanguge(lang);
                        await page.waitForTimeout(1000)

                        await Promise.all([
                            test.step('Promo Card', async () => {
                                const titleIsNotFound = await page.checkPromoTourn({
                                    promoType: 'promo',
                                    lang: locales[lang],
                                    expectedValue: promoTitle,
                                    section: 'promo',
                                });

                                if(!titleIsNotFound){
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

                                if(!titleIsNotFound){
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

                        //@ts-ignore
                        ])
                    })
                    await page.closePage()
                }),
                ...localesToTestTournament.map(async ({lang , page, promoTitle, tournamentTitle}) => {
                    await test.step(`Checking ${lang} Tournament Page`, async () => {
                        await page.waitForTimeout(10000)
                        await page.goTo(tournamentPageLink);
                        await page.changeLanguge(lang);
                        await page.waitForTimeout(1000)

                        await Promise.all([
                            test.step('Tournament Page Tournament', async () => {
                                const receivedArray = await page.getTournamentPromoText();
                                const titleIsNotFoundTournament = await page.checkTitle({
                                    receivedArray: receivedArray,
                                    expectedValue: tournamentTitle})

                                if(!titleIsNotFoundTournament){
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
                                    expectedValue: promoTitle})

                                if(!titleIsNotFoundPromo){
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


           // await Promise.all([
           //          test.step('Main Page Slider EN One Dep', async () => {
           //              const enTest = await mainPage1.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["EN"], expectedValue: promoTournTitle.EN.promo
           //              });
           //              console.log(chalk.green(`EN:\n ${enTest.receivedArray}`));
           //              expect.soft(enTest.titleIsFound, `${promoTournTitle.EN.promo} found on the page EN`).toEqual(true);
           //          }),
           //
           //          test.step('Main Page Slider EN-AU One Dep', async () => {
           //              const auTest = await mainPage2.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["EN-AU"], expectedValue: promoTournTitle.EN.promo
           //              });
           //              console.log(chalk.green(`AU:\n ${auTest.receivedArray}`));
           //              expect.soft(auTest.titleIsFound, `${promoTournTitle.EN.promo} found on the page EN-AU`).toEqual(true);
           //          }),
           //
           //          test.step('Main Page Slider EN-NZ One Dep', async () => {
           //              const nzTest = await mainPage3.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["EN-NZ"], expectedValue: promoTournTitle.EN.promo
           //              });
           //              console.log(chalk.green(`NZ:\n ${nzTest.receivedArray}`));
           //              expect.soft(nzTest.titleIsFound, `${promoTournTitle.EN.promo} found on the page EN-NZ`).toEqual(true);
           //          }),
           //
           //          test.step('Main Page Slider CA One Dep', async () => {
           //              const caTest = await mainPage4.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["CA"], expectedValue: promoTournTitle.CA.promo
           //              });
           //              console.log(chalk.green(`CA:\n ${caTest.receivedArray}`));
           //              expect.soft(caTest.titleIsFound, `${promoTournTitle.CA.promo} found on the page EN-CA`).toEqual(true);
           //          }),
           //
           //          test.step('Main Page Slider DE One Dep', async () => {
           //              const deTest = await mainPage5.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["DE"], expectedValue: promoTournTitle.DE.promo
           //              });
           //              console.log(chalk.green(`DE:\n ${deTest.receivedArray}`));
           //              expect.soft(deTest.titleIsFound, `${promoTournTitle.DE.promo} found on the page DE`).toEqual(true);
           //          }),
           //
           //          test.step('Main Page Slider FR-CA One Dep', async () => {
           //              const frTest = await mainPage6.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["FR"], expectedValue: promoTournTitle.FR.promo
           //              });
           //              console.log(chalk.green(`FR-CA:\n ${frTest.receivedArray}`));
           //              expect.soft(frTest.titleIsFound, `${promoTournTitle.FR.promo} found on the page FR`).toEqual(true);
           //          }),
           //
           //          test.step('Main Page Slider NO One Dep', async () => {
           //              const noTest = await mainPage7.checkMainSliderPromo({
           //                  url: mainPageLink, lang: locales["NO"], expectedValue: promoTournTitle.NO.promo
           //              });
           //              console.log(chalk.green(`NO:\n ${noTest.receivedArray}`));
           //              expect.soft(noTest.titleIsFound, `${promoTournTitle.NO.promo} found on the page NO`).toEqual(true);
           //          })
           //      ]);
           //  });
           //
           //  test('Main Page Slider tournaments', async () => {
           //      await Promise.all([
           //          test.step('Main Page Slider EN Tournament', async () => {
           //              const enTest = await mainPage1.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["EN"], expectedValue: promoTournTitle.EN.tourn
           //              })
           //              console.log(chalk.green(`EN:\n ${enTest.receivedArray}`))
           //              expect.soft(enTest.titleIsFound, `${promoTournTitle.EN.tourn} found on the page EN`).toEqual(true)
           //          }),
           //
           //          test.step('Main Page Slider EN-AU Tournament', async () => {
           //              const auTest = await mainPage2.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["EN-AU"], expectedValue: promoTournTitle.EN.tourn
           //              })
           //              console.log(chalk.green(`AU:\n ${auTest.receivedArray}`))
           //              expect.soft(auTest.titleIsFound, `${promoTournTitle.EN.tourn} found on the page AU`).toEqual(true)
           //          }),
           //
           //          test.step('Main Page Slider EN-NZ Tournament', async () => {
           //              const nzTest = await mainPage3.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["EN-NZ"], expectedValue: promoTournTitle.EN.tourn
           //              })
           //              console.log(chalk.green(`NZ:\n ${nzTest.receivedArray}`))
           //              expect.soft(nzTest.titleIsFound, `${promoTournTitle.EN.tourn} found on the page NZ`).toEqual(true)
           //          }),
           //
           //          test.step('Main Page Slider CA Tournament', async () => {
           //              const caTest = await mainPage4.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["CA"], expectedValue: promoTournTitle.CA.tourn
           //              })
           //              console.log(chalk.green(`CA:\n ${caTest.receivedArray}`))
           //              expect.soft(caTest.titleIsFound, `${promoTournTitle.EN.tourn} found on the page CA`).toEqual(true)
           //          }),
           //
           //          test.step('Main Page Slider DE Tournament', async () => {
           //              const deTest = await mainPage5.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["DE"], expectedValue: promoTournTitle.DE.tourn
           //              })
           //              console.log(chalk.green(`DE:\n ${deTest.receivedArray}`))
           //              expect.soft(deTest.titleIsFound, `${promoTournTitle.DE.tourn} found on the page DE`).toEqual(true)
           //          }),
           //
           //          test.step('Main Page Slider FR-CA Tournament', async () => {
           //              const frTest = await mainPage6.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["FR"], expectedValue: promoTournTitle.FR.tourn
           //              })
           //              console.log(chalk.green(`FR:\n ${frTest.receivedArray}`))
           //              expect.soft(frTest.titleIsFound, `${promoTournTitle.FR.tourn} found on the page FR`).toEqual(true)
           //          }),
           //
           //          test.step('Main Page Slider NO Tournament', async () => {
           //              const noTest = await mainPage7.checkMainSliderTournament({
           //                  url: mainPageLink, lang: locales["NO"], expectedValue: promoTournTitle.NO.tourn
           //              })
           //              console.log(chalk.green(`EN:\n ${noTest.receivedArray}`))
           //              expect.soft(noTest.titleIsFound, `${promoTournTitle.NO.tourn} found on the page NO`).toEqual(true)
           //          })
           //      ])
           //  })

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
    // })


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



