/**
 * Use this file for global setup and/or teardown.
 * Examples: create test data before all or each test, open/close page or browser itself, add data to the report, so on.
 * For more details please see: https://mochajs.org/#root-hook-plugins
 */

exports.mochaHooks = async (): Promise<any> => {
    return {
        async beforeAll(): Promise<void> {
            const delimeter = `\r\n${'-'.repeat(50)}\r\n`;
            console.log(delimeter + 'Before all script is running.' + delimeter);
        },

        async beforeEach(): Promise<void> {
            //
        },

        async afterEach(): Promise<void> {
            if (!this.currentTest.state || this.currentTest.state === 'failed') {
                //
            }
        },

        async afterAll(): Promise<void> {
            //
        },
    };
};
