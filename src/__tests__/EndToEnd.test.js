import puppeteer from 'puppeteer';

/* Feature 2: Show/hide an event details
Scenario 1: An event element is collapsed by default.
Scenario 2: User can expand an event to see its details.
Scenario 3: User can collapse an event to hide its details. */


describe('show/hide an event detils', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000')
        await page.waitForSelector('.event');
    })
    afterAll(() => {
        browser.close();
    });

    test('an element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event__Details');//Check variables here
        expect(eventDetails).toBeNull();
        browser.close()
    })
    test('User can expand an event to see its details', async () => {
        await page.click('event .details-btn'); // confirm variables here
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
        browser.close();
    })
    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    })
})