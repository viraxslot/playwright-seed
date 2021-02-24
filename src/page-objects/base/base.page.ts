import { Page } from 'playwright';
import * as config from 'config';

export class BasePage {
    protected readonly _page: Page;
    protected readonly _path: string;

    constructor(page: Page, path: string) {
        this._page = page;
        this._path = path;
    }

    async open(path: string): Promise<void> {
        const baseUrl = config.get('baseUrl') as string;
        await this.page.goto(baseUrl + path);
    }

    public get page(): Page {
        return this._page;
    }

    public get path(): string {
        return this._path;
    }
}
