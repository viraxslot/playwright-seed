## Playwright boilerplate

Initial setup for Playwright automation project:

-   [x] typescript
-   [x] eslint with precommit hooks
-   [x] mochajs runner
-   [x] chaijs assertion library
-   [x] global mocha hooks
-   [x] different environments support
-   [x] entrypoint for local or docker run
-   [x] docker support
-   [x] page objects
-   [x] api controller based on axios
-   [ ] check API response with json schema
-   [ ] allure reporter with logs and screenshots

## Docs

### Global setup

Use [this file](./src/mocha-hooks.ts) for global setup and/or teardown.

Examples: create test data before all or each test, open/close page or browser itself, add data to the report, so on.
For more details please see: https://mochajs.org/#root-hook-plugins

### Supported CLI parameters:

`grep` - [string] filter test names;

`suites` - [string] filter test filenames;

`headless` - [boolean] switch headless mode for the browser;

`slowmo` - [number, milliseconds], add a delay after the browser action during tests execution;

`browser` - [chromium/firefox/webkit], browser for the test run.

### Entrypopint run

To run tests locally or in docker please use [entrypoint file](./entrypoint.sh). You can use all CLI parameters from the list above.

Local run examples:

`env=api:qa ./entrypoint.sh` - will run only api tests on qa environment;

`headless=false env=e2e:qa suites=login ./entrypoint.sh` - will run only end-to-end login tests on qa environment in headful mode;

`env=all:qa grep=test ./entrypoint.sh` - will run all tests on qa environment with `test` in title;

Docker examples:

Please use `docker:base` script to build the image and `docker:test` to run tests. Use the same grep/suites parameters via docker `--env`.

### Browser instance

Please make sure you call `await browser.getPage()` to get a new browser context and page **before each test**. It's needed because we close all contexts after each test in [root hooks](./src/mocha-hooks.ts).

### Page objects

Please see [login page](./src/page-objects/login/login.page.ts) for page object example. This page contains examples how to initialize ui element and ui widget.
The main concept of widgets: to split all page elements to logical blocks for better understanding and maintenance.
It's better to use ui widgets for pages with multiple ui elements, if you have up to 5 elements on the page please use [KISS](https://en.wikipedia.org/wiki/KISS_principle) principle.

### API Controller

Please see example of API-test [here](./test/api/todo.spec.ts).
