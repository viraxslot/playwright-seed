import { Timeouts } from '../../shared/timeouts';
import { UIElement } from '../base/ui-element';

export class Input extends UIElement {
    async fill(value: string, options?: Record<string, any>): Promise<void> {
        const el = await this.wait();
        return el.fill(value, options);
    }

    async press(key: string, options?: Record<string, any>): Promise<void> {
        const el = await this.wait();
        return el.press(key, options);
    }

    async getValue(timeout?: number): Promise<string> {
        const defaultTimeout = timeout ?? Timeouts.FiveSecondsTimeout;
        await this.wait({ timeout: defaultTimeout });
        return this.page.$eval(this.selector, (el) => (el as HTMLInputElement).value);
    }
}
