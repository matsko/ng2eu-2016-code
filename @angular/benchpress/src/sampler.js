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
var measure_values_1 = require('./measure_values');
var metric_1 = require('./metric');
var reporter_1 = require('./reporter');
var validator_1 = require('./validator');
var web_driver_adapter_1 = require('./web_driver_adapter');
/**
 * The Sampler owns the sample loop:
 * 1. calls the prepare/execute callbacks,
 * 2. gets data from the metric
 * 3. asks the validator for a valid sample
 * 4. reports the new data to the reporter
 * 5. loop until there is a valid sample
 */
var Sampler = (function () {
    function Sampler(_driver, _metric, _reporter, _validator, _prepare, _execute, _now) {
        this._driver = _driver;
        this._metric = _metric;
        this._reporter = _reporter;
        this._validator = _validator;
        this._prepare = _prepare;
        this._execute = _execute;
        this._now = _now;
    }
    Sampler.prototype.sample = function () {
        var _this = this;
        var loop = function (lastState) {
            return _this._iterate(lastState).then(function (newState) {
                if (lang_1.isPresent(newState.validSample)) {
                    return newState;
                }
                else {
                    return loop(newState);
                }
            });
        };
        return loop(new SampleState([], null));
    };
    Sampler.prototype._iterate = function (lastState) {
        var _this = this;
        var resultPromise;
        if (this._prepare !== common_options_1.Options.NO_PREPARE) {
            resultPromise = this._driver.waitFor(this._prepare);
        }
        else {
            resultPromise = Promise.resolve(null);
        }
        if (this._prepare !== common_options_1.Options.NO_PREPARE || lastState.completeSample.length === 0) {
            resultPromise = resultPromise.then(function (_) { return _this._metric.beginMeasure(); });
        }
        return resultPromise.then(function (_) { return _this._driver.waitFor(_this._execute); })
            .then(function (_) { return _this._metric.endMeasure(_this._prepare === common_options_1.Options.NO_PREPARE); })
            .then(function (measureValues) { return _this._report(lastState, measureValues); });
    };
    Sampler.prototype._report = function (state, metricValues) {
        var _this = this;
        var measureValues = new measure_values_1.MeasureValues(state.completeSample.length, this._now(), metricValues);
        var completeSample = state.completeSample.concat([measureValues]);
        var validSample = this._validator.validate(completeSample);
        var resultPromise = this._reporter.reportMeasureValues(measureValues);
        if (lang_1.isPresent(validSample)) {
            resultPromise =
                resultPromise.then(function (_) { return _this._reporter.reportSample(completeSample, validSample); });
        }
        return resultPromise.then(function (_) { return new SampleState(completeSample, validSample); });
    };
    Sampler.PROVIDERS = [Sampler];
    Sampler.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Sampler.ctorParameters = [
        { type: web_driver_adapter_1.WebDriverAdapter, },
        { type: metric_1.Metric, },
        { type: reporter_1.Reporter, },
        { type: validator_1.Validator, },
        { type: Function, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.PREPARE,] },] },
        { type: Function, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.EXECUTE,] },] },
        { type: Function, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.NOW,] },] },
    ];
    return Sampler;
}());
exports.Sampler = Sampler;
var SampleState = (function () {
    function SampleState(completeSample, validSample) {
        this.completeSample = completeSample;
        this.validSample = validSample;
    }
    return SampleState;
}());
exports.SampleState = SampleState;
//# sourceMappingURL=sampler.js.map