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
var IOsDriverExtension = (function (_super) {
    __extends(IOsDriverExtension, _super);
    function IOsDriverExtension(_driver) {
        _super.call(this);
        this._driver = _driver;
    }
    IOsDriverExtension.prototype.gc = function () { throw new Error('Force GC is not supported on iOS'); };
    IOsDriverExtension.prototype.timeBegin = function (name) {
        return this._driver.executeScript("console.time('" + name + "');");
    };
    IOsDriverExtension.prototype.timeEnd = function (name, restartName) {
        if (restartName === void 0) { restartName = null; }
        var script = "console.timeEnd('" + name + "');";
        if (lang_1.isPresent(restartName)) {
            script += "console.time('" + restartName + "');";
        }
        return this._driver.executeScript(script);
    };
    // See https://github.com/WebKit/webkit/tree/master/Source/WebInspectorUI/Versions
    IOsDriverExtension.prototype.readPerfLog = function () {
        var _this = this;
        // TODO(tbosch): Bug in IOsDriver: Need to execute at least one command
        // so that the browser logs can be read out!
        return this._driver.executeScript('1+1')
            .then(function (_) { return _this._driver.logs('performance'); })
            .then(function (entries) {
            var records = [];
            entries.forEach(function (entry) {
                var message = JSON.parse(entry['message'])['message'];
                if (message['method'] === 'Timeline.eventRecorded') {
                    records.push(message['params']['record']);
                }
            });
            return _this._convertPerfRecordsToEvents(records);
        });
    };
    /** @internal */
    IOsDriverExtension.prototype._convertPerfRecordsToEvents = function (records, events) {
        var _this = this;
        if (events === void 0) { events = null; }
        if (!events) {
            events = [];
        }
        records.forEach(function (record) {
            var endEvent = null;
            var type = record['type'];
            var data = record['data'];
            var startTime = record['startTime'];
            var endTime = record['endTime'];
            if (type === 'FunctionCall' && (lang_1.isBlank(data) || data['scriptName'] !== 'InjectedScript')) {
                events.push(createStartEvent('script', startTime));
                endEvent = createEndEvent('script', endTime);
            }
            else if (type === 'Time') {
                events.push(createMarkStartEvent(data['message'], startTime));
            }
            else if (type === 'TimeEnd') {
                events.push(createMarkEndEvent(data['message'], startTime));
            }
            else if (type === 'RecalculateStyles' || type === 'Layout' || type === 'UpdateLayerTree' ||
                type === 'Paint' || type === 'Rasterize' || type === 'CompositeLayers') {
                events.push(createStartEvent('render', startTime));
                endEvent = createEndEvent('render', endTime);
            }
            // Note: ios used to support GCEvent up until iOS 6 :-(
            if (lang_1.isPresent(record['children'])) {
                _this._convertPerfRecordsToEvents(record['children'], events);
            }
            if (lang_1.isPresent(endEvent)) {
                events.push(endEvent);
            }
        });
        return events;
    };
    IOsDriverExtension.prototype.perfLogFeatures = function () { return new web_driver_extension_1.PerfLogFeatures({ render: true }); };
    IOsDriverExtension.prototype.supports = function (capabilities) {
        return capabilities['browserName'].toLowerCase() === 'safari';
    };
    IOsDriverExtension.PROVIDERS = [IOsDriverExtension];
    IOsDriverExtension.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    IOsDriverExtension.ctorParameters = [
        { type: web_driver_adapter_1.WebDriverAdapter, },
    ];
    return IOsDriverExtension;
}(web_driver_extension_1.WebDriverExtension));
exports.IOsDriverExtension = IOsDriverExtension;
function createEvent(ph, name, time, args) {
    if (args === void 0) { args = null; }
    var result = {
        'cat': 'timeline',
        'name': name,
        'ts': time,
        'ph': ph,
        // The ios protocol does not support the notions of multiple processes in
        // the perflog...
        'pid': 'pid0'
    };
    if (lang_1.isPresent(args)) {
        result['args'] = args;
    }
    return result;
}
function createStartEvent(name, time, args) {
    if (args === void 0) { args = null; }
    return createEvent('B', name, time, args);
}
function createEndEvent(name, time, args) {
    if (args === void 0) { args = null; }
    return createEvent('E', name, time, args);
}
function createMarkStartEvent(name, time) {
    return createEvent('B', name, time);
}
function createMarkEndEvent(name, time) {
    return createEvent('E', name, time);
}
//# sourceMappingURL=ios_driver_extension.js.map