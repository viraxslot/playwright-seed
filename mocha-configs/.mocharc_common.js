module.exports = {
    reporter: 'mocha-multi-reporters',
    reporterOptions: {
        configFile: 'mocha-configs//reporterConfig.json',
    },
    extension: ['ts'],
    timeout: 100000,
    require: ['ts-node/register', './src/mocha-hooks.ts'],
};
