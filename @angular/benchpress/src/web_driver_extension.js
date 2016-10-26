/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var common_options_1 = require('./common_options');
/**
 * A WebDriverExtension implements extended commands of the webdriver protocol
 * for a given browser, independent of the WebDriverAdapter.
 * Needs one implementation for every supported Browser.
 */
var WebDriverExtension = (function () {
    function WebDriverExtension() {
    }
    WebDriverExtension.provideFirstSupported = function (childTokens) {
        var res = [
            {
                provide: _CHILDREN,
                useFactory: function (injector) { return childTokens.map(function (token) { return injector.get(token); }); },
                deps: [core_1.Injector]
            },
            {
                provide: WebDriverExtension,
                useFactory: function (children, capabilities) {
                    var delegate;
                    children.forEach(function (extension) {
                        if (extension.supports(capabilities)) {
                            delegate = extension;
                        }
                    });
                    if (!delegate) {
                        throw new Error('Could not find a delegate for given capabilities!');
                    }
                    return delegate;
                },
                deps: [_CHILDREN, common_options_1.Options.CAPABILITIES]
            }
        ];
        return res;
    };
    WebDriverExtension.prototype.gc = function () { throw new Error('NYI'); };
    WebDriverExtension.prototype.timeBegin = function (name) { throw new Error('NYI'); };
    WebDriverExtension.prototype.timeEnd = function (name, restartName) { throw new Error('NYI'); };
    /**
     * Format:
     * - cat: category of the event
     * - name: event name: 'script', 'gc', 'render', ...
     * - ph: phase: 'B' (begin), 'E' (end), 'X' (Complete event), 'I' (Instant event)
     * - ts: timestamp in ms, e.g. 12345
     * - pid: process id
     * - args: arguments, e.g. {heapSize: 1234}
     *
     * Based on [Chrome Trace Event
     *Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit)
     **/
    WebDriverExtension.prototype.readPerfLog = function () { throw new Error('NYI'); };
    WebDriverExtension.prototype.perfLogFeatures = function () { throw new Error('NYI'); };
    WebDriverExtension.prototype.supports = function (capabilities) { return true; };
    return WebDriverExtension;
}());
exports.WebDriverExtension = WebDriverExtension;
var PerfLogFeatures = (function () {
    function PerfLogFeatures(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.render, render = _c === void 0 ? false : _c, _d = _b.gc, gc = _d === void 0 ? false : _d, _e = _b.frameCapture, frameCapture = _e === void 0 ? false : _e, _f = _b.userTiming, userTiming = _f === void 0 ? false : _f;
        this.render = render;
        this.gc = gc;
        this.frameCapture = frameCapture;
        this.userTiming = userTiming;
    }
    return PerfLogFeatures;
}());
exports.PerfLogFeatures = PerfLogFeatures;
var _CHILDREN = new core_1.OpaqueToken('WebDriverExtension.children');
//# sourceMappingURL=web_driver_extension.js.map