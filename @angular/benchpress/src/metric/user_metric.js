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
var metric_1 = require('../metric');
var web_driver_adapter_1 = require('../web_driver_adapter');
var UserMetric = (function (_super) {
    __extends(UserMetric, _super);
    function UserMetric(_userMetrics, _wdAdapter) {
        _super.call(this);
        this._userMetrics = _userMetrics;
        this._wdAdapter = _wdAdapter;
    }
    /**
     * Starts measuring
     */
    UserMetric.prototype.beginMeasure = function () { return Promise.resolve(true); };
    /**
     * Ends measuring.
     */
    UserMetric.prototype.endMeasure = function (restart) {
        var resolve;
        var reject;
        var promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        var adapter = this._wdAdapter;
        var names = Object.keys(this._userMetrics);
        function getAndClearValues() {
            Promise.all(names.map(function (name) { return adapter.executeScript("return window." + name); }))
                .then(function (values) {
                if (values.every(function (v) { return typeof v === 'number'; })) {
                    Promise.all(names.map(function (name) { return adapter.executeScript("delete window." + name); }))
                        .then(function (_) {
                        var map = {};
                        for (var i = 0, n = names.length; i < n; i++) {
                            map[names[i]] = values[i];
                        }
                        resolve(map);
                    }, reject);
                }
                else {
                    setTimeout(getAndClearValues, 100);
                }
            }, reject);
        }
        getAndClearValues();
        return promise;
    };
    /**
     * Describes the metrics provided by this metric implementation.
     * (e.g. units, ...)
     */
    UserMetric.prototype.describe = function () { return this._userMetrics; };
    UserMetric.PROVIDERS = [UserMetric];
    UserMetric.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    UserMetric.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.USER_METRICS,] },] },
        { type: web_driver_adapter_1.WebDriverAdapter, },
    ];
    return UserMetric;
}(metric_1.Metric));
exports.UserMetric = UserMetric;
//# sourceMappingURL=user_metric.js.map