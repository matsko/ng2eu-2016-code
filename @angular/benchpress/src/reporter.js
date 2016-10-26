/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * A reporter reports measure values and the valid sample.
 */
var Reporter = (function () {
    function Reporter() {
    }
    Reporter.prototype.reportMeasureValues = function (values) { throw new Error('NYI'); };
    Reporter.prototype.reportSample = function (completeSample, validSample) {
        throw new Error('NYI');
    };
    return Reporter;
}());
exports.Reporter = Reporter;
//# sourceMappingURL=reporter.js.map