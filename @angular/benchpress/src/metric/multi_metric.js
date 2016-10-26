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
var metric_1 = require('../metric');
var MultiMetric = (function (_super) {
    __extends(MultiMetric, _super);
    function MultiMetric(_metrics) {
        _super.call(this);
        this._metrics = _metrics;
    }
    MultiMetric.provideWith = function (childTokens) {
        return [
            {
                provide: _CHILDREN,
                useFactory: function (injector) { return childTokens.map(function (token) { return injector.get(token); }); },
                deps: [core_1.Injector]
            },
            {
                provide: MultiMetric,
                useFactory: function (children) { return new MultiMetric(children); },
                deps: [_CHILDREN]
            }
        ];
    };
    /**
     * Starts measuring
     */
    MultiMetric.prototype.beginMeasure = function () {
        return Promise.all(this._metrics.map(function (metric) { return metric.beginMeasure(); }));
    };
    /**
     * Ends measuring and reports the data
     * since the begin call.
     * @param restart: Whether to restart right after this.
     */
    MultiMetric.prototype.endMeasure = function (restart) {
        return Promise.all(this._metrics.map(function (metric) { return metric.endMeasure(restart); }))
            .then(function (values) { return mergeStringMaps(values); });
    };
    /**
     * Describes the metrics provided by this metric implementation.
     * (e.g. units, ...)
     */
    MultiMetric.prototype.describe = function () {
        return mergeStringMaps(this._metrics.map(function (metric) { return metric.describe(); }));
    };
    return MultiMetric;
}(metric_1.Metric));
exports.MultiMetric = MultiMetric;
function mergeStringMaps(maps) {
    var result = {};
    maps.forEach(function (map) { Object.keys(map).forEach(function (prop) { result[prop] = map[prop]; }); });
    return result;
}
var _CHILDREN = new core_1.OpaqueToken('MultiMetric.children');
//# sourceMappingURL=multi_metric.js.map