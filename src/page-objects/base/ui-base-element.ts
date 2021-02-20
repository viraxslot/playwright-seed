import { Page } from 'playwright';

export class UIBaseElement {
    protected readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    get page(): Page {
        return this._page;
    }
}
