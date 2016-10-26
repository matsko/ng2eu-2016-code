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
var web_driver_adapter_1 = require('../web_driver_adapter');
var web_driver_extension_1 = require('../web_driver_extension');
/**
 * Set the following 'traceCategories' to collect metrics in Chrome:
 * 'v8,blink.console,disabled-by-default-devtools.timeline,devtools.timeline,blink.user_timing'
 *
 * In order to collect the frame rate related metrics, add 'benchmark'
 * to the list above.
 */
var ChromeDriverExtension = (function (_super) {
    __extends(ChromeDriverExtension, _super);
    function ChromeDriverExtension(_driver, userAgent) {
        _super.call(this);
        this._driver = _driver;
        this._majorChromeVersion = this._parseChromeVersion(userAgent);
    }
    ChromeDriverExtension.prototype._parseChromeVersion = function (userAgent) {
        if (!userAgent) {
            return -1;
        }
        var v = userAgent.split(/Chrom(e|ium)\//g)[2];
        if (!v) {
            return -1;
        }
        v = v.split('.')[0];
        if (!v) {
            return -1;
        }
        return parseInt(v, 10);
    };
    ChromeDriverExtension.prototype.gc = function () { return this._driver.executeScript('window.gc()'); };
    ChromeDriverExtension.prototype.timeBegin = function (name) {
        return this._driver.executeScript("console.time('" + name + "');");
    };
    ChromeDriverExtension.prototype.timeEnd = function (name, restartName) {
        if (restartName === void 0) { restartName = null; }
        var script = "console.timeEnd('" + name + "');";
        if (restartName) {
            script += "console.time('" + restartName + "');";
        }
        return this._driver.executeScript(script);
    };
    // See [Chrome Trace Event
    // Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/edit)
    ChromeDriverExtension.prototype.readPerfLog = function () {
        var _this = this;
        // TODO(tbosch): Chromedriver bug https://code.google.com/p/chromedriver/issues/detail?id=1098
        // Need to execute at least one command so that the browser logs can be read out!
        return this._driver.executeScript('1+1')
            .then(function (_) { return _this._driver.logs('performance'); })
            .then(function (entries) {
            var events = [];
            entries.forEach(function (entry) {
                var message = JSON.parse(entry['message'])['message'];
                if (message['method'] === 'Tracing.dataCollected') {
                    events.push(message['params']);
                }
                if (message['method'] === 'Tracing.bufferUsage') {
                    throw new Error('The DevTools trace buffer filled during the test!');
                }
            });
            return _this._convertPerfRecordsToEvents(events);
        });
    };
    ChromeDriverExtension.prototype._convertPerfRecordsToEvents = function (chromeEvents, normalizedEvents) {
        var _this = this;
        if (normalizedEvents === void 0) { normalizedEvents = null; }
        if (!normalizedEvents) {
            normalizedEvents = [];
        }
        chromeEvents.forEach(function (event) {
            var categories = _this._parseCategories(event['cat']);
            var normalizedEvent = _this._convertEvent(event, categories);
            if (normalizedEvent != null)
                normalizedEvents.push(normalizedEvent);
        });
        return normalizedEvents;
    };
    ChromeDriverExtension.prototype._convertEvent = function (event, categories) {
        var name = event['name'];
        var args = event['args'];
        if (this._isEvent(categories, name, ['blink.console'])) {
            return normalizeEvent(event, { 'name': name });
        }
        else if (this._isEvent(categories, name, ['benchmark'], 'BenchmarkInstrumentation::ImplThreadRenderingStats')) {
            // TODO(goderbauer): Instead of BenchmarkInstrumentation::ImplThreadRenderingStats the
            // following events should be used (if available) for more accurate measurments:
            //   1st choice: vsync_before - ground truth on Android
            //   2nd choice: BenchmarkInstrumentation::DisplayRenderingStats - available on systems with
            //               new surfaces framework (not broadly enabled yet)
            //   3rd choice: BenchmarkInstrumentation::ImplThreadRenderingStats - fallback event that is
            //               always available if something is rendered
            var frameCount = event['args']['data']['frame_count'];
            if (frameCount > 1) {
                throw new Error('multi-frame render stats not supported');
            }
            if (frameCount == 1) {
                return normalizeEvent(event, { 'name': 'frame' });
            }
        }
        else if (this._isEvent(categories, name, ['disabled-by-default-devtools.timeline'], 'Rasterize') ||
            this._isEvent(categories, name, ['disabled-by-default-devtools.timeline'], 'CompositeLayers')) {
            return normalizeEvent(event, { 'name': 'render' });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline', 'v8'], 'MajorGC')) {
            var normArgs = {
                'majorGc': true,
                'usedHeapSize': args['usedHeapSizeAfter'] !== undefined ? args['usedHeapSizeAfter'] :
                    args['usedHeapSizeBefore']
            };
            return normalizeEvent(event, { 'name': 'gc', 'args': normArgs });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline', 'v8'], 'MinorGC')) {
            var normArgs = {
                'majorGc': false,
                'usedHeapSize': args['usedHeapSizeAfter'] !== undefined ? args['usedHeapSizeAfter'] :
                    args['usedHeapSizeBefore']
            };
            return normalizeEvent(event, { 'name': 'gc', 'args': normArgs });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline'], 'FunctionCall') &&
            (!args || !args['data'] ||
                (args['data']['scriptName'] !== 'InjectedScript' && args['data']['scriptName'] !== ''))) {
            return normalizeEvent(event, { 'name': 'script' });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline'], 'EvaluateScript')) {
            return normalizeEvent(event, { 'name': 'script' });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline', 'blink'], 'UpdateLayoutTree')) {
            return normalizeEvent(event, { 'name': 'render' });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline'], 'UpdateLayerTree') ||
            this._isEvent(categories, name, ['devtools.timeline'], 'Layout') ||
            this._isEvent(categories, name, ['devtools.timeline'], 'Paint')) {
            return normalizeEvent(event, { 'name': 'render' });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline'], 'ResourceReceivedData')) {
            var normArgs_1 = { 'encodedDataLength': args['data']['encodedDataLength'] };
            return normalizeEvent(event, { 'name': 'receivedData', 'args': normArgs_1 });
        }
        else if (this._isEvent(categories, name, ['devtools.timeline'], 'ResourceSendRequest')) {
            var data = args['data'];
            var normArgs_2 = { 'url': data['url'], 'method': data['requestMethod'] };
            return normalizeEvent(event, { 'name': 'sendRequest', 'args': normArgs_2 });
        }
        else if (this._isEvent(categories, name, ['blink.user_timing'], 'navigationStart')) {
            return normalizeEvent(event, { 'name': 'navigationStart' });
        }
        return null; // nothing useful in this event
    };
    ChromeDriverExtension.prototype._parseCategories = function (categories) { return categories.split(','); };
    ChromeDriverExtension.prototype._isEvent = function (eventCategories, eventName, expectedCategories, expectedName) {
        if (expectedName === void 0) { expectedName = null; }
        var hasCategories = expectedCategories.reduce(function (value, cat) { return value && eventCategories.indexOf(cat) !== -1; }, true);
        return !expectedName ? hasCategories : hasCategories && eventName === expectedName;
    };
    ChromeDriverExtension.prototype.perfLogFeatures = function () {
        return new web_driver_extension_1.PerfLogFeatures({ render: true, gc: true, frameCapture: true, userTiming: true });
    };
    ChromeDriverExtension.prototype.supports = function (capabilities) {
        return this._majorChromeVersion >= 44 && capabilities['browserName'].toLowerCase() === 'chrome';
    };
    ChromeDriverExtension.PROVIDERS = [ChromeDriverExtension];
    ChromeDriverExtension.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ChromeDriverExtension.ctorParameters = [
        { type: web_driver_adapter_1.WebDriverAdapter, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.USER_AGENT,] },] },
    ];
    return ChromeDriverExtension;
}(web_driver_extension_1.WebDriverExtension));
exports.ChromeDriverExtension = ChromeDriverExtension;
function normalizeEvent(chromeEvent, data) {
    var ph = chromeEvent['ph'].toUpperCase();
    if (ph === 'S') {
        ph = 'B';
    }
    else if (ph === 'F') {
        ph = 'E';
    }
    else if (ph === 'R') {
        // mark events from navigation timing
        ph = 'I';
    }
    var result = { 'pid': chromeEvent['pid'], 'ph': ph, 'cat': 'timeline', 'ts': chromeEvent['ts'] / 1000 };
    if (ph === 'X') {
        var dur = chromeEvent['dur'];
        if (dur === undefined) {
            dur = chromeEvent['tdur'];
        }
        result['dur'] = !dur ? 0.0 : dur / 1000;
    }
    for (var prop in data) {
        result[prop] = data[prop];
    }
    return result;
}
//# sourceMappingURL=chrome_driver_extension.js.map