import { browser } from '../../src/browser-instance';
import { LoginPage } from '../../src/page-objects/login/login.page';
import { Credentials } from './../../test-data/login.credentials';

describe('UI: login suite', function () {
    let loginPage: LoginPage;

    beforeEach('create page', async function () {
        const page = await browser.getPage();
        loginPage = new LoginPage(page);
    });

    it('should be possible to login', async function () {
        await loginPage.open();

        await loginPage.loginTitle.innerTextContains('This is where you can log into the secure area');
        await loginPage.loginForm.signIn(Credentials.successLogin.username, Credentials.successLogin.password);
        await loginPage.page.waitForSelector('text=You logged into a secure area!');
    });
});
