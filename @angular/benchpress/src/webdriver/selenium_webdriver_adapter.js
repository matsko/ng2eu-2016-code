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
var web_driver_adapter_1 = require('../web_driver_adapter');
/**
 * Adapter for the selenium-webdriver.
 */
var SeleniumWebDriverAdapter = (function (_super) {
    __extends(SeleniumWebDriverAdapter, _super);
    function SeleniumWebDriverAdapter(_driver) {
        _super.call(this);
        this._driver = _driver;
    }
    SeleniumWebDriverAdapter.prototype.waitFor = function (callback) { return this._driver.call(callback); };
    SeleniumWebDriverAdapter.prototype.executeScript = function (script) { return this._driver.executeScript(script); };
    SeleniumWebDriverAdapter.prototype.executeAsyncScript = function (script) {
        return this._driver.executeAsyncScript(script);
    };
    SeleniumWebDriverAdapter.prototype.capabilities = function () {
        return this._driver.getCapabilities().then(function (capsObject) {
            var localData = {};
            capsObject.forEach(function (value, key) { localData[key] = value; });
            return localData;
        });
    };
    SeleniumWebDriverAdapter.prototype.logs = function (type) {
        // Needed as selenium-webdriver does not forward
        // performance logs in the correct way via manage().logs
        return this._driver.schedule(new Command('getLog').setParameter('type', type), 'WebDriver.manage().logs().get(' + type + ')');
    };
    SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS = [{
            provide: web_driver_adapter_1.WebDriverAdapter,
            useFactory: function () { return new SeleniumWebDriverAdapter(global.browser); }
        }];
    return SeleniumWebDriverAdapter;
}(web_driver_adapter_1.WebDriverAdapter));
exports.SeleniumWebDriverAdapter = SeleniumWebDriverAdapter;
/**
 * Copy of the `Command` class of webdriver as
 * it is not exposed via index.js in selenium-webdriver.
 */
var Command = (function () {
    function Command(name_) {
        this.name_ = name_;
        this.parameters_ = {};
    }
    Command.prototype.getName = function () { return this.name_; };
    Command.prototype.setParameter = function (name, value) {
        this.parameters_[name] = value;
        return this;
    };
    Command.prototype.setParameters = function (parameters) {
        this.parameters_ = parameters;
        return this;
    };
    Command.prototype.getParameter = function (key) { return this.parameters_[key]; };
    Command.prototype.getParameters = function () { return this.parameters_; };
    return Command;
}());
//# sourceMappingURL=selenium_webdriver_adapter.js.map