import { Page } from 'playwright';

export class BasePage {
    protected _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    public get page(): Page {
        return this._page;
    }

    public set page(page: Page) {
        this._page = page;
    }
}
