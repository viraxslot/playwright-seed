import { Label } from './../ui-elements/label';
import { Page } from 'playwright';
import { LoginFormWidget } from './widgets/login.form';
import { BasePage } from './../base/base.page';

export class LoginPage extends BasePage {
    private readonly _loginTitle: Label;
    private readonly _loginForm: LoginFormWidget;

    constructor(page: Page) {
        super(page, 'login');

        this._loginTitle = new Label(this, '.subheader');

        this._loginForm = new LoginFormWidget(this, {
            username: '#username',
            password: '#password',
            submit: '[type="submit"]',
        });
    }

    public get loginTitle(): Label {
        return this._loginTitle;
    }

    public get loginForm(): LoginFormWidget {
        return this._loginForm;
    }

    public async open(): Promise<void> {
        await super.open(this.path);
    }
}
