import { expect } from 'chai';
import * as config from 'config';
import { Page } from 'playwright';
import { browser } from '../../src/browser-instance';

describe('UI: check url suite', function () {
    let page: Page;

    beforeEach('create page', async function () {
        page = await browser.getPage();
    });

    it('should be correct url', async function () {
        const baseUrl = config.get('baseUrl') as string;
        await page.goto(baseUrl);

        const url = await page.url();
        expect(url).equals(baseUrl);
    });
});
