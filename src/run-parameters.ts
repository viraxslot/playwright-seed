import { BrowserName } from './shared/enums';

class RunParameters {
    private _browserName: BrowserName;
    private _browserConfig;
    private _headless: boolean;
    private _slowmo: number;

    public get browserName(): BrowserName {
        return this._browserName;
    }

    public set browserName(browserName: BrowserName) {
        this._browserName = browserName;
    }

    public get browserConfig(): undefined {
        return this._browserConfig;
    }

    public set browserConfig(browserConfig: undefined) {
        this._browserConfig = browserConfig;
    }

    public get slowmo(): number {
        return this._slowmo;
    }

    public set slowmo(slowMo: number) {
        this._slowmo = slowMo;
    }

    public get headless(): boolean {
        return this._headless;
    }

    public set headless(headless: boolean) {
        this._headless = headless;
    }
}

const runParameters = new RunParameters();
export { runParameters };
