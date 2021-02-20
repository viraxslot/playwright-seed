import { BasePage } from './base.page';
import { UIBaseElement } from './ui-base-element';
import { UIWidget } from './ui-widget';

export class UIElement extends UIBaseElement {
    protected _selector: string;
    protected _parent: BasePage | UIWidget | UIElement;

    constructor(parent: BasePage | UIWidget | UIElement, selector: string) {
        super(parent.page);
        this._selector = selector;
    }

    public async wait(): Promise<void> {
        await this.page.waitForSelector(this._selector);
    }

    public async waitHidden(): Promise<void> {
        await this.page.waitForSelector(this._selector, { state: 'hidden' });
    }

    public get selector(): string {
        return this._selector;
    }

    public get parent(): BasePage | UIWidget | UIElement {
        return this._parent;
    }
}
