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
var validator_1 = require('../validator');
/**
 * A validator that waits for the sample to have a certain size.
 */
var SizeValidator = (function (_super) {
    __extends(SizeValidator, _super);
    function SizeValidator(_sampleSize) {
        _super.call(this);
        this._sampleSize = _sampleSize;
    }
    SizeValidator.prototype.describe = function () { return { 'sampleSize': this._sampleSize }; };
    SizeValidator.prototype.validate = function (completeSample) {
        if (completeSample.length >= this._sampleSize) {
            return collection_1.ListWrapper.slice(completeSample, completeSample.length - this._sampleSize, completeSample.length);
        }
        else {
            return null;
        }
    };
    SizeValidator.SAMPLE_SIZE = new core_1.OpaqueToken('SizeValidator.sampleSize');
    SizeValidator.PROVIDERS = [SizeValidator, { provide: SizeValidator.SAMPLE_SIZE, useValue: 10 }];
    SizeValidator.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SizeValidator.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [SizeValidator.SAMPLE_SIZE,] },] },
    ];
    return SizeValidator;
}(validator_1.Validator));
exports.SizeValidator = SizeValidator;
//# sourceMappingURL=size_validator.js.map