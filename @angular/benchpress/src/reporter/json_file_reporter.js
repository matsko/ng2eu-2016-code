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
var common_options_1 = require('../common_options');
var reporter_1 = require('../reporter');
var sample_description_1 = require('../sample_description');
var util_1 = require('./util');
/**
 * A reporter that writes results into a json file.
 */
var JsonFileReporter = (function (_super) {
    __extends(JsonFileReporter, _super);
    function JsonFileReporter(_description, _path, _writeFile, _now) {
        _super.call(this);
        this._description = _description;
        this._path = _path;
        this._writeFile = _writeFile;
        this._now = _now;
    }
    JsonFileReporter.prototype.reportMeasureValues = function (measureValues) { return Promise.resolve(null); };
    JsonFileReporter.prototype.reportSample = function (completeSample, validSample) {
        var stats = {};
        util_1.sortedProps(this._description.metrics).forEach(function (metricName) {
            stats[metricName] = util_1.formatStats(validSample, metricName);
        });
        var content = JSON.stringify({
            'description': this._description,
            'stats': stats,
            'completeSample': completeSample,
            'validSample': validSample,
        }, null, 2);
        var filePath = this._path + "/" + this._description.id + "_" + this._now().getTime() + ".json";
        return this._writeFile(filePath, content);
    };
    JsonFileReporter.PATH = new core_1.OpaqueToken('JsonFileReporter.path');
    JsonFileReporter.PROVIDERS = [JsonFileReporter, { provide: JsonFileReporter.PATH, useValue: '.' }];
    JsonFileReporter.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    JsonFileReporter.ctorParameters = [
        { type: sample_description_1.SampleDescription, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [JsonFileReporter.PATH,] },] },
        { type: Function, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.WRITE_FILE,] },] },
        { type: Function, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.NOW,] },] },
    ];
    return JsonFileReporter;
}(reporter_1.Reporter));
exports.JsonFileReporter = JsonFileReporter;
//# sourceMappingURL=json_file_reporter.js.map