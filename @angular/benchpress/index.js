/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// Must be imported first, because angular2 decorators throws on load.
require('reflect-metadata');
var core_1 = require('@angular/core');
exports.Injector = core_1.Injector;
exports.OpaqueToken = core_1.OpaqueToken;
exports.ReflectiveInjector = core_1.ReflectiveInjector;
var common_options_1 = require('./src/common_options');
exports.Options = common_options_1.Options;
var measure_values_1 = require('./src/measure_values');
exports.MeasureValues = measure_values_1.MeasureValues;
var metric_1 = require('./src/metric');
exports.Metric = metric_1.Metric;
var multi_metric_1 = require('./src/metric/multi_metric');
exports.MultiMetric = multi_metric_1.MultiMetric;
var perflog_metric_1 = require('./src/metric/perflog_metric');
exports.PerflogMetric = perflog_metric_1.PerflogMetric;
var user_metric_1 = require('./src/metric/user_metric');
exports.UserMetric = user_metric_1.UserMetric;
var reporter_1 = require('./src/reporter');
exports.Reporter = reporter_1.Reporter;
var console_reporter_1 = require('./src/reporter/console_reporter');
exports.ConsoleReporter = console_reporter_1.ConsoleReporter;
var json_file_reporter_1 = require('./src/reporter/json_file_reporter');
exports.JsonFileReporter = json_file_reporter_1.JsonFileReporter;
var multi_reporter_1 = require('./src/reporter/multi_reporter');
exports.MultiReporter = multi_reporter_1.MultiReporter;
var runner_1 = require('./src/runner');
exports.Runner = runner_1.Runner;
var sample_description_1 = require('./src/sample_description');
exports.SampleDescription = sample_description_1.SampleDescription;
var sampler_1 = require('./src/sampler');
exports.SampleState = sampler_1.SampleState;
exports.Sampler = sampler_1.Sampler;
var validator_1 = require('./src/validator');
exports.Validator = validator_1.Validator;
var regression_slope_validator_1 = require('./src/validator/regression_slope_validator');
exports.RegressionSlopeValidator = regression_slope_validator_1.RegressionSlopeValidator;
var size_validator_1 = require('./src/validator/size_validator');
exports.SizeValidator = size_validator_1.SizeValidator;
var web_driver_adapter_1 = require('./src/web_driver_adapter');
exports.WebDriverAdapter = web_driver_adapter_1.WebDriverAdapter;
var web_driver_extension_1 = require('./src/web_driver_extension');
exports.PerfLogFeatures = web_driver_extension_1.PerfLogFeatures;
exports.WebDriverExtension = web_driver_extension_1.WebDriverExtension;
var chrome_driver_extension_1 = require('./src/webdriver/chrome_driver_extension');
exports.ChromeDriverExtension = chrome_driver_extension_1.ChromeDriverExtension;
var firefox_driver_extension_1 = require('./src/webdriver/firefox_driver_extension');
exports.FirefoxDriverExtension = firefox_driver_extension_1.FirefoxDriverExtension;
var ios_driver_extension_1 = require('./src/webdriver/ios_driver_extension');
exports.IOsDriverExtension = ios_driver_extension_1.IOsDriverExtension;
var selenium_webdriver_adapter_1 = require('./src/webdriver/selenium_webdriver_adapter');
exports.SeleniumWebDriverAdapter = selenium_webdriver_adapter_1.SeleniumWebDriverAdapter;
//# sourceMappingURL=index.js.map