const puppeteer = require('puppeteer');
const puppetHelper = require('./puppetHelper');

(async () => {
    const browser = await puppeteer.launch(puppetHelper.puppeteerInitSettings);
    const page = await browser.newPage();
    await puppetHelper.setViewport(page);

    await page.goto('https://apex.oracle.com/pls/apex/f?p=51138:LOGIN_DESKTOP::::::');

    await page.type('#P101_USERNAME', 'guest');
    await page.type('#P101_PASSWORD', 'apex_demo');
    await Promise.all([page.click('#P101_LOGIN'), page.waitForNavigation()]);
    await Promise.all([page.click('#t_TreeNav_2'), page.waitForNavigation()]);
    await page.click('#B34558310541397483670');

    const iframe = await puppetHelper.iframePopup({
        frameScope: page,
        pageNumber: 6
    });

    await iframe.focus('#P6_LIST_PRICE')
    await iframe.type('#P6_LIST_PRICE', 'apex_demo')
    await iframe.select('#P6_CATEGORY', 'Womens')

    await puppetHelper.radioButton({
        frameScope: iframe,
        selector: '#P6_PRODUCT_AVAIL_1'
    })
    await puppetHelper.checkBox({
        frameScope: iframe,
        mainSelector: '#P6_NEW',
        arrCheckBoxValues: ['Return1', 'Return2'],
        checked_Y_N: 'N'
    })



    await iframe.click('#B26849884785480446734')
})();