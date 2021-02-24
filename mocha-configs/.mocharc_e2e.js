module.exports = {
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
        configFile: 'mocha-configs//reporterConfig.json',
    },
    extension: ['ts'],
    spec: ['test/e2e/**/*.spec.ts'],
    timeout: 100000,
    require: ['ts-node/register', './src/mocha-hooks.ts'],
};
