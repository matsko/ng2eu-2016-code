/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var common_options_1 = require('./common_options');
var lang_1 = require('./facade/lang');
var metric_1 = require('./metric');
var multi_metric_1 = require('./metric/multi_metric');
var perflog_metric_1 = require('./metric/perflog_metric');
var user_metric_1 = require('./metric/user_metric');
var reporter_1 = require('./reporter');
var console_reporter_1 = require('./reporter/console_reporter');
var multi_reporter_1 = require('./reporter/multi_reporter');
var sample_description_1 = require('./sample_description');
var sampler_1 = require('./sampler');
var validator_1 = require('./validator');
var regression_slope_validator_1 = require('./validator/regression_slope_validator');
var size_validator_1 = require('./validator/size_validator');
var web_driver_adapter_1 = require('./web_driver_adapter');
var web_driver_extension_1 = require('./web_driver_extension');
var chrome_driver_extension_1 = require('./webdriver/chrome_driver_extension');
var firefox_driver_extension_1 = require('./webdriver/firefox_driver_extension');
var ios_driver_extension_1 = require('./webdriver/ios_driver_extension');
/**
 * The Runner is the main entry point for executing a sample run.
 * It provides defaults, creates the injector and calls the sampler.
 */
var Runner = (function () {
    function Runner(_defaultProviders) {
        if (_defaultProviders === void 0) { _defaultProviders = []; }
        this._defaultProviders = _defaultProviders;
    }
    Runner.prototype.sample = function (_a) {
        var id = _a.id, execute = _a.execute, prepare = _a.prepare, microMetrics = _a.microMetrics, providers = _a.providers, userMetrics = _a.userMetrics;
        var sampleProviders = [
            _DEFAULT_PROVIDERS, this._defaultProviders, { provide: common_options_1.Options.SAMPLE_ID, useValue: id },
            { provide: common_options_1.Options.EXECUTE, useValue: execute }
        ];
        if (lang_1.isPresent(prepare)) {
            sampleProviders.push({ provide: common_options_1.Options.PREPARE, useValue: prepare });
        }
        if (lang_1.isPresent(microMetrics)) {
            sampleProviders.push({ provide: common_options_1.Options.MICRO_METRICS, useValue: microMetrics });
        }
        if (lang_1.isPresent(userMetrics)) {
            sampleProviders.push({ provide: common_options_1.Options.USER_METRICS, useValue: userMetrics });
        }
        if (lang_1.isPresent(providers)) {
            sampleProviders.push(providers);
        }
        var inj = core_1.ReflectiveInjector.resolveAndCreate(sampleProviders);
        var adapter = inj.get(web_driver_adapter_1.WebDriverAdapter);
        return Promise
            .all([adapter.capabilities(), adapter.executeScript('return window.navigator.userAgent;')])
            .then(function (args) {
            var capabilities = args[0];
            var userAgent = args[1];
            // This might still create instances twice. We are creating a new injector with all the
            // providers.
            // Only WebDriverAdapter is reused.
            // TODO vsavkin consider changing it when toAsyncFactory is added back or when child
            // injectors are handled better.
            var injector = core_1.ReflectiveInjector.resolveAndCreate([
                sampleProviders, { provide: common_options_1.Options.CAPABILITIES, useValue: capabilities },
                { provide: common_options_1.Options.USER_AGENT, useValue: userAgent },
                { provide: web_driver_adapter_1.WebDriverAdapter, useValue: adapter }
            ]);
            var sampler = injector.get(sampler_1.Sampler);
            return sampler.sample();
        });
    };
    return Runner;
}());
exports.Runner = Runner;
var _DEFAULT_PROVIDERS = [
    common_options_1.Options.DEFAULT_PROVIDERS,
    sampler_1.Sampler.PROVIDERS,
    console_reporter_1.ConsoleReporter.PROVIDERS,
    regression_slope_validator_1.RegressionSlopeValidator.PROVIDERS,
    size_validator_1.SizeValidator.PROVIDERS,
    chrome_driver_extension_1.ChromeDriverExtension.PROVIDERS,
    firefox_driver_extension_1.FirefoxDriverExtension.PROVIDERS,
    ios_driver_extension_1.IOsDriverExtension.PROVIDERS,
    perflog_metric_1.PerflogMetric.PROVIDERS,
    user_metric_1.UserMetric.PROVIDERS,
    sample_description_1.SampleDescription.PROVIDERS,
    multi_reporter_1.MultiReporter.provideWith([console_reporter_1.ConsoleReporter]),
    multi_metric_1.MultiMetric.provideWith([perflog_metric_1.PerflogMetric, user_metric_1.UserMetric]),
    { provide: reporter_1.Reporter, useExisting: multi_reporter_1.MultiReporter },
    { provide: validator_1.Validator, useExisting: regression_slope_validator_1.RegressionSlopeValidator },
    web_driver_extension_1.WebDriverExtension.provideFirstSupported([chrome_driver_extension_1.ChromeDriverExtension, firefox_driver_extension_1.FirefoxDriverExtension, ios_driver_extension_1.IOsDriverExtension]),
    { provide: metric_1.Metric, useExisting: multi_metric_1.MultiMetric },
];
//# sourceMappingURL=runner.js.map