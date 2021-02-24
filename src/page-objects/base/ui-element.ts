import { expect } from 'chai';
import { Timeouts } from './../../shared/timeouts';
import { PageWaitForSelectorOptions } from '../../shared/interfaces';
import { ElementHandle } from 'playwright';
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

    private async waitElement(selector: string, options?: PageWaitForSelectorOptions): Promise<ElementHandle<SVGElement | HTMLElement>> {
        const defaultOptions = options || { state: 'visible' };
        return this.page.waitForSelector(selector, defaultOptions);
    }

    public async wait(options?: PageWaitForSelectorOptions): Promise<ElementHandle<SVGElement | HTMLElement>> {
        return this.waitElement(this._selector, options);
    }

    public async waitHidden(options?: PageWaitForSelectorOptions): Promise<ElementHandle<SVGElement | HTMLElement>> {
        const defaultOptions = Object.assign({}, options, { state: 'hidden' });

        return this.waitElement(this._selector, defaultOptions);
    }

    async click(options?: Record<string, any>): Promise<void> {
        const el = await this.wait();
        await el.click(options);
    }

    private async getText(timeout?: number): Promise<string> {
        const defaultTimeout = timeout ?? Timeouts.FiveSecondsTimeout;
        const element = await this.wait({ timeout: defaultTimeout });
        return element.innerText();
    }

    async innerTextContains(expectedValue: string | number, message?: string): Promise<void> {
        const actualText = await this.getText();
        expect(actualText.trim(), message).contains(expectedValue.toString());
    }

    public get selector(): string {
        return this._selector;
    }

    public get parent(): BasePage | UIWidget | UIElement {
        return this._parent;
    }
}
