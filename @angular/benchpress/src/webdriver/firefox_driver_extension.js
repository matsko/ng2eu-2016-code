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
var web_driver_adapter_1 = require('../web_driver_adapter');
var web_driver_extension_1 = require('../web_driver_extension');
var FirefoxDriverExtension = (function (_super) {
    __extends(FirefoxDriverExtension, _super);
    function FirefoxDriverExtension(_driver) {
        _super.call(this);
        this._driver = _driver;
        this._profilerStarted = false;
    }
    FirefoxDriverExtension.prototype.gc = function () { return this._driver.executeScript('window.forceGC()'); };
    FirefoxDriverExtension.prototype.timeBegin = function (name) {
        if (!this._profilerStarted) {
            this._profilerStarted = true;
            this._driver.executeScript('window.startProfiler();');
        }
        return this._driver.executeScript('window.markStart("' + name + '");');
    };
    FirefoxDriverExtension.prototype.timeEnd = function (name, restartName) {
        if (restartName === void 0) { restartName = null; }
        var script = 'window.markEnd("' + name + '");';
        if (lang_1.isPresent(restartName)) {
            script += 'window.markStart("' + restartName + '");';
        }
        return this._driver.executeScript(script);
    };
    FirefoxDriverExtension.prototype.readPerfLog = function () {
        return this._driver.executeAsyncScript('var cb = arguments[0]; window.getProfile(cb);');
    };
    FirefoxDriverExtension.prototype.perfLogFeatures = function () { return new web_driver_extension_1.PerfLogFeatures({ render: true, gc: true }); };
    FirefoxDriverExtension.prototype.supports = function (capabilities) {
        return capabilities['browserName'].toLowerCase() === 'firefox';
    };
    FirefoxDriverExtension.PROVIDERS = [FirefoxDriverExtension];
    FirefoxDriverExtension.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    FirefoxDriverExtension.ctorParameters = [
        { type: web_driver_adapter_1.WebDriverAdapter, },
    ];
    return FirefoxDriverExtension;
}(web_driver_extension_1.WebDriverExtension));
exports.FirefoxDriverExtension = FirefoxDriverExtension;
//# sourceMappingURL=firefox_driver_extension.js.map