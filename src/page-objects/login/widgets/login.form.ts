import { Button } from '../../ui-elements/button';
import { UIWidget, WidgetParent } from '../../base/ui-widget';
import { Input } from '../../ui-elements/input';

export class LoginFormWidgetSelectors {
    username: string;
    password: string;
    submit: string;
}

export class LoginFormWidget extends UIWidget {
    private readonly _username: Input;
    private readonly _password: Input;
    private readonly _submit: Button;

    constructor(parent: WidgetParent, selectors: LoginFormWidgetSelectors) {
        super(parent, selectors);

        this._username = new Input(this, selectors.username);
        this._password = new Input(this, selectors.password);
        this._submit = new Button(this, selectors.submit);
    }

    async signIn(username: string, password: string): Promise<void> {
        await this._username.fill(username);
        await this._password.fill(password);
        await this._submit.click();
    }

    public get username(): Input {
        return this._username;
    }

    public get password(): Input {
        return this._password;
    }

    public get submit(): Button {
        return this._submit;
    }
}
