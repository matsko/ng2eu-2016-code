/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * A metric is measures values
 */
var Metric = (function () {
    function Metric() {
    }
    /**
     * Starts measuring
     */
    Metric.prototype.beginMeasure = function () { throw new Error('NYI'); };
    /**
     * Ends measuring and reports the data
     * since the begin call.
     * @param restart: Whether to restart right after this.
     */
    Metric.prototype.endMeasure = function (restart) { throw new Error('NYI'); };
    /**
     * Describes the metrics provided by this metric implementation.
     * (e.g. units, ...)
     */
    Metric.prototype.describe = function () { throw new Error('NYI'); };
    return Metric;
}());
exports.Metric = Metric;
//# sourceMappingURL=metric.js.map