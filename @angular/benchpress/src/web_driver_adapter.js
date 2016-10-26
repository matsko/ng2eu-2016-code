/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * A WebDriverAdapter bridges API differences between different WebDriver clients,
 * e.g. JS vs Dart Async vs Dart Sync webdriver.
 * Needs one implementation for every supported WebDriver client.
 */
var WebDriverAdapter = (function () {
    function WebDriverAdapter() {
    }
    WebDriverAdapter.prototype.waitFor = function (callback) { throw new Error('NYI'); };
    WebDriverAdapter.prototype.executeScript = function (script) { throw new Error('NYI'); };
    WebDriverAdapter.prototype.executeAsyncScript = function (script) { throw new Error('NYI'); };
    WebDriverAdapter.prototype.capabilities = function () { throw new Error('NYI'); };
    WebDriverAdapter.prototype.logs = function (type) { throw new Error('NYI'); };
    return WebDriverAdapter;
}());
exports.WebDriverAdapter = WebDriverAdapter;
//# sourceMappingURL=web_driver_adapter.js.map