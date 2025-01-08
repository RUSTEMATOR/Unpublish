
///typescript
// Helper function to initialize pages and main page objects
async function initializePages(browser: Browser, numPages: number): Promise<{ pages: Page[], mainPages: MainPage[] }> {
    const ctx = await browser.newContext();
    const pages: Page[] = [];
    const mainPages: MainPage[] = [];

    for (let i = 0; i < numPages; i++) {
        const page = await ctx.newPage();
        pages.push(page);
        mainPages.push(new MainPage(page));
    }

    return { pages, mainPages };
}

test.describe.only('Check unpublish on the main page', () => {
    let mainPages: MainPage[];
    let pages: Page[];

    test.beforeEach(async ({ browser }) => {
        const result = await initializePages(browser, 8);
        pages = result.pages;
        mainPages = result.mainPages;

        await mainPages[0].goTo(mainPageLink);
        await mainPages[0].logIn({ email: email, password: password });
    });

    test(`Main Slider Promo`, async () => {
        await Promise.all([
            test.step('Main slider EN One Dep', async () => {
                const enTest = await mainPages[1].checkMainSliderPromo({
                    url: mainPageLink, lang: locales["EN"], expectedValue: promoTournTitle.EN.promo
                });
                console.log(chalk.green(`EN:\n ${enTest.receivedArray}`));
                expect.soft(enTest.titleIsFound, `${promoTournTitle.EN.promo} found on the page EN`).toEqual(true);
            }),
            // Add other test steps similarly...
        ]);
    });
});
```

This approach reduces redundancy and makes the code more maintainable.