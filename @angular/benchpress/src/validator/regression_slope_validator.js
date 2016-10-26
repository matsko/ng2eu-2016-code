/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var collection_1 = require('../facade/collection');
var statistic_1 = require('../statistic');
var validator_1 = require('../validator');
/**
 * A validator that checks the regression slope of a specific metric.
 * Waits for the regression slope to be >=0.
 */
var RegressionSlopeValidator = (function (_super) {
    __extends(RegressionSlopeValidator, _super);
    function RegressionSlopeValidator(_sampleSize, _metric) {
        _super.call(this);
        this._sampleSize = _sampleSize;
        this._metric = _metric;
    }
    RegressionSlopeValidator.prototype.describe = function () {
        return { 'sampleSize': this._sampleSize, 'regressionSlopeMetric': this._metric };
    };
    RegressionSlopeValidator.prototype.validate = function (completeSample) {
        if (completeSample.length >= this._sampleSize) {
            var latestSample = collection_1.ListWrapper.slice(completeSample, completeSample.length - this._sampleSize, completeSample.length);
            var xValues = [];
            var yValues = [];
            for (var i = 0; i < latestSample.length; i++) {
                // For now, we only use the array index as x value.
                // TODO(tbosch): think about whether we should use time here instead
                xValues.push(i);
                yValues.push(latestSample[i].values[this._metric]);
            }
            var regressionSlope = statistic_1.Statistic.calculateRegressionSlope(xValues, statistic_1.Statistic.calculateMean(xValues), yValues, statistic_1.Statistic.calculateMean(yValues));
            return regressionSlope >= 0 ? latestSample : null;
        }
        else {
            return null;
        }
    };
    RegressionSlopeValidator.SAMPLE_SIZE = new core_1.OpaqueToken('RegressionSlopeValidator.sampleSize');
    RegressionSlopeValidator.METRIC = new core_1.OpaqueToken('RegressionSlopeValidator.metric');
    RegressionSlopeValidator.PROVIDERS = [
        RegressionSlopeValidator, { provide: RegressionSlopeValidator.SAMPLE_SIZE, useValue: 10 },
        { provide: RegressionSlopeValidator.METRIC, useValue: 'scriptTime' }
    ];
    RegressionSlopeValidator.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RegressionSlopeValidator.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [RegressionSlopeValidator.SAMPLE_SIZE,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [RegressionSlopeValidator.METRIC,] },] },
    ];
    return RegressionSlopeValidator;
}(validator_1.Validator));
exports.RegressionSlopeValidator = RegressionSlopeValidator;
//# sourceMappingURL=regression_slope_validator.js.map