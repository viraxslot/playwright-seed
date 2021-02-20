import { Page } from 'playwright';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
