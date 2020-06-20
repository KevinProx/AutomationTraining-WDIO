const debug = !!process.env.DEBUG;
const execArgv = debug ? ['--inspect'] : [];
const stepTimout = debug ? 24 * 60 * 60 * 1000 : 6000;
const capabilities = debug ?
    [{ browserName: 'chrome', maxInstances: 1 }] :
    [{
        maxInstances: 5,
        browserName: 'chrome'
    }];

const maxInstances = debug ? 1 : 10;

exports.config = {

    runner: 'local',

    path: '/wd/hub',

    port: 4444,

    specs: ['./src/features/**/*.feature'],

    exclude: [],

    maxInstances: maxInstances,

    capabilities: capabilities,

    logLevel: 'silent',

    execArgv: execArgv,
    bail: 0,

    baseUrl: 'http://localhost:3112',

    waitforTimeout: 10000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,

    services: ['selenium-standalone'],

    framework: 'cucumber',

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
            },
        ],
    ],

    cucumberOpts: {
        backtrace: false,
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: stepTimout,
        ignoreUndefinedDefinitions: false,
        requireModule: [
            'tsconfig-paths/register',
            () => {
                require('ts-node').register({ files: true });
            },
        ],
        require: ['./src/stepDefinitions/*.steps.ts'],
    }
};
