module.exports = {
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
        configFile: 'mocha-configs//reporterConfig.json',
    },
    extension: ['ts'],
    spec: 'test/**/*.spec.ts',
    timeout: 100000,
    require: ['ts-node/register', 'lib/mocha-hooks.ts'],
};
