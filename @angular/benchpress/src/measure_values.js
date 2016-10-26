/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var MeasureValues = (function () {
    function MeasureValues(runIndex, timeStamp, values) {
        this.runIndex = runIndex;
        this.timeStamp = timeStamp;
        this.values = values;
    }
    MeasureValues.prototype.toJson = function () {
        return {
            'timeStamp': this.timeStamp.toJSON(),
            'runIndex': this.runIndex,
            'values': this.values,
        };
    };
    return MeasureValues;
}());
exports.MeasureValues = MeasureValues;
//# sourceMappingURL=measure_values.js.map