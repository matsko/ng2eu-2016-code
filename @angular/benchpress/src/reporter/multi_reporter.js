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
var reporter_1 = require('../reporter');
var MultiReporter = (function (_super) {
    __extends(MultiReporter, _super);
    function MultiReporter(_reporters) {
        _super.call(this);
        this._reporters = _reporters;
    }
    MultiReporter.provideWith = function (childTokens) {
        return [
            {
                provide: _CHILDREN,
                useFactory: function (injector) { return childTokens.map(function (token) { return injector.get(token); }); },
                deps: [core_1.Injector],
            },
            {
                provide: MultiReporter,
                useFactory: function (children) { return new MultiReporter(children); },
                deps: [_CHILDREN]
            }
        ];
    };
    MultiReporter.prototype.reportMeasureValues = function (values) {
        return Promise.all(this._reporters.map(function (reporter) { return reporter.reportMeasureValues(values); }));
    };
    MultiReporter.prototype.reportSample = function (completeSample, validSample) {
        return Promise.all(this._reporters.map(function (reporter) { return reporter.reportSample(completeSample, validSample); }));
    };
    return MultiReporter;
}(reporter_1.Reporter));
exports.MultiReporter = MultiReporter;
var _CHILDREN = new core_1.OpaqueToken('MultiReporter.children');
//# sourceMappingURL=multi_reporter.js.map