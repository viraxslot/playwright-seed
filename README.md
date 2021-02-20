## Playwright boilerplate

Initial setup for Playwright automation project:

-   [x] typescript
-   [x] eslint with precommit hooks
-   [x] mochajs runner
-   [x] chaijs assertion library
-   [x] global mocha hooks
-   [ ] page objects
-   [ ] entrypoint for local or docker run
-   [ ] docker support
-   [ ] api controller based on axios
-   [ ] allure reporter with logs and screenshots

## Docs

### Global setup

Use [this file](./src/mocha-hooks.ts) for global setup and/or teardown.

Examples: create test data before all or each test, open/close page or browser itself, add data to the report, so on.
For more details please see: https://mochajs.org/#root-hook-plugins

### Local run

Please see the full list of run parameters [in this file](./src/run-parameters.ts).

For local test run you can use the next commands:

`npm test` - default run;

`headless=false npm test` - run with browser in headful mode;

`slowmo=1000 headless=false npm test` - debug run with 1 second delay;
