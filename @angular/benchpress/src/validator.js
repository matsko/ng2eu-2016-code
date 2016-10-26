/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * A Validator calculates a valid sample out of the complete sample.
 * A valid sample is a sample that represents the population that should be observed
 * in the correct way.
 */
var Validator = (function () {
    function Validator() {
    }
    /**
     * Calculates a valid sample out of the complete sample
     */
    Validator.prototype.validate = function (completeSample) { throw new Error('NYI'); };
    /**
     * Returns a Map that describes the properties of the validator
     * (e.g. sample size, ...)
     */
    Validator.prototype.describe = function () { throw new Error('NYI'); };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map