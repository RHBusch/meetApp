import puppeteer from 'puppeteer';

/* Feature 2: Show/hide an event details
Scenario 1: An event element is collapsed by default.
Scenario 2: User can expand an event to see its details.
Scenario 3: User can collapse an event to hide its details. */

//Careful with variables here... especially show/hideDetails + button className
/*
Encountered four errors (one was a timeout thing), 
the other was not having npm run start running at the same time as npm run test
the other was having my variables out of order
ther other was having browser.close(); stuck in the test itself instead of afterAll(). 

*/

describe('show/hide an event detils', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(300000);
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/meetapp')
        await page.waitForSelector('.event');
    })

    test('an element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .eventDescription');//Check variables here
        expect(eventDetails).toBeNull();

    })
    test('User can expand an event to see its details', async () => {
        await page.click('.event .showDetails'); // confirm variables here
        const eventDetails = await page.$('.event .eventDescription');
        expect(eventDetails).toBeDefined();

    })
    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .hideDetails');
        const eventDetails = await page.$('.event .eventDescription');
        expect(eventDetails).toBeNull();
    })
    afterAll(() => {
        browser.close();
    })
})

describe('Filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(300000);
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:3000/meetapp')
        await page.waitForSelector('.event');
    })

    test('When user has not searched for a city, show upcoming events from all cities', async () => {
        const numEvents = await page.$$eval('.event', (element) => element.length);
        expect(numEvents).toBe(5);
    })
    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', "London, UK", { delay: 200 });
        const citySuggestions = await page.$$eval('.suggestions li', (element) => element.length);
        expect(citySuggestions).toBe(2);
    })

    test('User can select a city from the suggested list', async () => {
        await page.type('.city', "London, UK", { delay: 200 });
        await page.click('.suggestions li');
        const countSuggestions = await page.$$eval('.suggestions li', (element) => element.length)
        expect(countSuggestions).toBe(1)
    })
    afterAll(() => {
        browser.close();
    })
})