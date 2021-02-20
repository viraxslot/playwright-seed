import * as config from 'config';
import { assign } from 'lodash';
import * as yn from 'yn';
import { browser } from '../src/browser-instance';
import { BrowserName } from '../src/shared/enums';
import { runParameters } from './run-parameters';

exports.mochaHooks = async (): Promise<any> => {
    return {
        async beforeAll(): Promise<void> {
            parseTestParameters();
            await initBrowser();
        },

        async beforeEach(): Promise<void> {
            //
        },

        async afterEach(): Promise<void> {
            // do something with the failed test
            if (!this.currentTest.state || this.currentTest.state === 'failed') {
                // example: save logs or screenshots to the report
            }

            await browser.closeAllContexts();
        },

        async afterAll(): Promise<void> {
            await browser.closeInstance();
        },
    };
};

function parseTestParameters() {
    runParameters.browserName = (process.env.browser as BrowserName) ?? BrowserName.Chromium;

    switch (runParameters.browserName) {
        case BrowserName.Chromium:
            runParameters.browserConfig = config.get('chromiumOptions');
            break;
        case BrowserName.Firefox:
            runParameters.browserConfig = config.get('firefoxOptions');
            break;
        case BrowserName.Webkit:
            runParameters.browserConfig = config.get('webkitOptions');
            break;
    }

    runParameters.browserConfig = assign(runParameters.browserConfig, { headless: yn(process.env.headless, { default: true }) });

    const slowmo = parseInt(process.env.slowmo);
    runParameters.slowmo = isNaN(slowmo) ? 0 : slowmo;
    runParameters.browserConfig = assign(runParameters.browserConfig, { slowMo: runParameters.slowmo });
}

async function initBrowser(): Promise<void> {
    await browser.createInstance(runParameters.browserName, runParameters.browserConfig);
}
