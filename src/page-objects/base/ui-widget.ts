import { BasePage } from './base.page';
import { UIBaseElement } from './ui-base-element';

export type WidgetParent = BasePage | UIWidget;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UIWidgetSelectors {
    //
}

export class UIWidget extends UIBaseElement {
    private _selectors: UIWidgetSelectors;
    protected _parent: BasePage | UIWidget;

    constructor(parent: WidgetParent, selectors: UIWidgetSelectors) {
        super(parent.page);
        this._selectors = selectors;
    }

    public get selectors(): UIWidgetSelectors {
        return this._selectors;
    }

    public get parent(): BasePage | UIWidget {
        return this._parent;
    }
}
