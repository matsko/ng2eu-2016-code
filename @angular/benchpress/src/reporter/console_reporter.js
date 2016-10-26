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
var lang_1 = require('../facade/lang');
var reporter_1 = require('../reporter');
var sample_description_1 = require('../sample_description');
var util_1 = require('./util');
/**
 * A reporter for the console
 */
var ConsoleReporter = (function (_super) {
    __extends(ConsoleReporter, _super);
    function ConsoleReporter(_columnWidth, sampleDescription, _print) {
        _super.call(this);
        this._columnWidth = _columnWidth;
        this._print = _print;
        this._metricNames = util_1.sortedProps(sampleDescription.metrics);
        this._printDescription(sampleDescription);
    }
    ConsoleReporter._lpad = function (value, columnWidth, fill) {
        if (fill === void 0) { fill = ' '; }
        var result = '';
        for (var i = 0; i < columnWidth - value.length; i++) {
            result += fill;
        }
        return result + value;
    };
    ConsoleReporter.prototype._printDescription = function (sampleDescription) {
        var _this = this;
        this._print("BENCHMARK " + sampleDescription.id);
        this._print('Description:');
        var props = util_1.sortedProps(sampleDescription.description);
        props.forEach(function (prop) { _this._print("- " + prop + ": " + sampleDescription.description[prop]); });
        this._print('Metrics:');
        this._metricNames.forEach(function (metricName) {
            _this._print("- " + metricName + ": " + sampleDescription.metrics[metricName]);
        });
        this._print('');
        this._printStringRow(this._metricNames);
        this._printStringRow(this._metricNames.map(function (_) { return ''; }), '-');
    };
    ConsoleReporter.prototype.reportMeasureValues = function (measureValues) {
        var formattedValues = this._metricNames.map(function (metricName) {
            var value = measureValues.values[metricName];
            return util_1.formatNum(value);
        });
        this._printStringRow(formattedValues);
        return Promise.resolve(null);
    };
    ConsoleReporter.prototype.reportSample = function (completeSample, validSamples) {
        this._printStringRow(this._metricNames.map(function (_) { return ''; }), '=');
        this._printStringRow(this._metricNames.map(function (metricName) { return util_1.formatStats(validSamples, metricName); }));
        return Promise.resolve(null);
    };
    ConsoleReporter.prototype._printStringRow = function (parts, fill) {
        var _this = this;
        if (fill === void 0) { fill = ' '; }
        this._print(parts.map(function (part) { return ConsoleReporter._lpad(part, _this._columnWidth, fill); }).join(' | '));
    };
    ConsoleReporter.PRINT = new core_1.OpaqueToken('ConsoleReporter.print');
    ConsoleReporter.COLUMN_WIDTH = new core_1.OpaqueToken('ConsoleReporter.columnWidth');
    ConsoleReporter.PROVIDERS = [
        ConsoleReporter, { provide: ConsoleReporter.COLUMN_WIDTH, useValue: 18 },
        { provide: ConsoleReporter.PRINT, useValue: lang_1.print }
    ];
    ConsoleReporter.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ConsoleReporter.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [ConsoleReporter.COLUMN_WIDTH,] },] },
        { type: sample_description_1.SampleDescription, },
        { type: Function, decorators: [{ type: core_1.Inject, args: [ConsoleReporter.PRINT,] },] },
    ];
    return ConsoleReporter;
}(reporter_1.Reporter));
exports.ConsoleReporter = ConsoleReporter;
//# sourceMappingURL=console_reporter.js.map