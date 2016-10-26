/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var Statistic = (function () {
    function Statistic() {
    }
    Statistic.calculateCoefficientOfVariation = function (sample, mean) {
        return Statistic.calculateStandardDeviation(sample, mean) / mean * 100;
    };
    Statistic.calculateMean = function (samples) {
        var total = 0;
        // TODO: use reduce
        samples.forEach(function (x) { return total += x; });
        return total / samples.length;
    };
    Statistic.calculateStandardDeviation = function (samples, mean) {
        var deviation = 0;
        // TODO: use reduce
        samples.forEach(function (x) { return deviation += Math.pow(x - mean, 2); });
        deviation = deviation / (samples.length);
        deviation = Math.sqrt(deviation);
        return deviation;
    };
    Statistic.calculateRegressionSlope = function (xValues, xMean, yValues, yMean) {
        // See http://en.wikipedia.org/wiki/Simple_linear_regression
        var dividendSum = 0;
        var divisorSum = 0;
        for (var i = 0; i < xValues.length; i++) {
            dividendSum += (xValues[i] - xMean) * (yValues[i] - yMean);
            divisorSum += Math.pow(xValues[i] - xMean, 2);
        }
        return dividendSum / divisorSum;
    };
    return Statistic;
}());
exports.Statistic = Statistic;
//# sourceMappingURL=statistic.js.map