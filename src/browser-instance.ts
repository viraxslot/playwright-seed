import { BrowserName } from './shared/enums';
import { IConfig } from 'config';
import { isNil } from 'lodash';
import { Browser, BrowserContext, BrowserContextOptions, chromium, firefox, LaunchOptions, Page, webkit } from 'playwright';
import { Timeouts } from './shared/timeouts';

class BrowserInstance {
    private _instance: Browser;
    private _lastContext: BrowserContext;
    private _lastPage: Page;

    public async createInstance(browserName: BrowserName, browserConfig: LaunchOptions): Promise<void> {
        this._instance = await { chromium, webkit, firefox }[browserName].launch(browserConfig);
    }

    public async closeInstance(): Promise<void> {
        if (!isNil(this._instance)) {
            await this._instance.close();
        }
    }

    public async getPage(): Promise<Page> {
        await this.createContextAndPage();

        return this._lastPage;
    }

    public async closeAllContexts(): Promise<void> {
        const contexts = await this._instance.contexts();
        for (const context of contexts) {
            await context.close();
        }

        this._lastContext = null;
        this._lastPage = null;
    }

    private async createContextAndPage(options?: BrowserContextOptions): Promise<void> {
        if (isNil(this._instance)) {
            throw new Error('Create browser instance first');
        }

        this._lastContext = await this._instance.newContext(options);
        this._lastPage = await this._lastContext.newPage();
        this._lastPage.setDefaultTimeout(Timeouts.DefaultTimeout);
    }
}

export const browser = new BrowserInstance();
