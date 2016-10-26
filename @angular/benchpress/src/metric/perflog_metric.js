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
var web_driver_extension_1 = require('../web_driver_extension');
/**
 * A metric that reads out the performance log
 */
var PerflogMetric = (function (_super) {
    __extends(PerflogMetric, _super);
    /**
     * @param driverExtension
     * @param setTimeout
     * @param microMetrics Name and description of metrics provided via console.time / console.timeEnd
     **/
    function PerflogMetric(_driverExtension, _setTimeout, _microMetrics, _forceGc, _captureFrames, _receivedData, _requestCount) {
        _super.call(this);
        this._driverExtension = _driverExtension;
        this._setTimeout = _setTimeout;
        this._microMetrics = _microMetrics;
        this._forceGc = _forceGc;
        this._captureFrames = _captureFrames;
        this._receivedData = _receivedData;
        this._requestCount = _requestCount;
        this._remainingEvents = [];
        this._measureCount = 0;
        this._perfLogFeatures = _driverExtension.perfLogFeatures();
        if (!this._perfLogFeatures.userTiming) {
            // User timing is needed for navigationStart.
            this._receivedData = false;
            this._requestCount = false;
        }
    }
    PerflogMetric.prototype.describe = function () {
        var res = {
            'scriptTime': 'script execution time in ms, including gc and render',
            'pureScriptTime': 'script execution time in ms, without gc nor render'
        };
        if (this._perfLogFeatures.render) {
            res['renderTime'] = 'render time in ms';
        }
        if (this._perfLogFeatures.gc) {
            res['gcTime'] = 'gc time in ms';
            res['gcAmount'] = 'gc amount in kbytes';
            res['majorGcTime'] = 'time of major gcs in ms';
            if (this._forceGc) {
                res['forcedGcTime'] = 'forced gc time in ms';
                res['forcedGcAmount'] = 'forced gc amount in kbytes';
            }
        }
        if (this._receivedData) {
            res['receivedData'] = 'encoded bytes received since navigationStart';
        }
        if (this._requestCount) {
            res['requestCount'] = 'count of requests sent since navigationStart';
        }
        if (this._captureFrames) {
            if (!this._perfLogFeatures.frameCapture) {
                var warningMsg = 'WARNING: Metric requested, but not supported by driver';
                // using dot syntax for metric name to keep them grouped together in console reporter
                res['frameTime.mean'] = warningMsg;
                res['frameTime.worst'] = warningMsg;
                res['frameTime.best'] = warningMsg;
                res['frameTime.smooth'] = warningMsg;
            }
            else {
                res['frameTime.mean'] = 'mean frame time in ms (target: 16.6ms for 60fps)';
                res['frameTime.worst'] = 'worst frame time in ms';
                res['frameTime.best'] = 'best frame time in ms';
                res['frameTime.smooth'] = 'percentage of frames that hit 60fps';
            }
        }
        for (var name_1 in this._microMetrics) {
            res[name_1] = this._microMetrics[name_1];
        }
        return res;
    };
    PerflogMetric.prototype.beginMeasure = function () {
        var _this = this;
        var resultPromise = Promise.resolve(null);
        if (this._forceGc) {
            resultPromise = resultPromise.then(function (_) { return _this._driverExtension.gc(); });
        }
        return resultPromise.then(function (_) { return _this._beginMeasure(); });
    };
    PerflogMetric.prototype.endMeasure = function (restart) {
        if (this._forceGc) {
            return this._endPlainMeasureAndMeasureForceGc(restart);
        }
        else {
            return this._endMeasure(restart);
        }
    };
    /** @internal */
    PerflogMetric.prototype._endPlainMeasureAndMeasureForceGc = function (restartMeasure) {
        var _this = this;
        return this._endMeasure(true).then(function (measureValues) {
            // disable frame capture for measurements during forced gc
            var originalFrameCaptureValue = _this._captureFrames;
            _this._captureFrames = false;
            return _this._driverExtension.gc()
                .then(function (_) { return _this._endMeasure(restartMeasure); })
                .then(function (forceGcMeasureValues) {
                _this._captureFrames = originalFrameCaptureValue;
                measureValues['forcedGcTime'] = forceGcMeasureValues['gcTime'];
                measureValues['forcedGcAmount'] = forceGcMeasureValues['gcAmount'];
                return measureValues;
            });
        });
    };
    PerflogMetric.prototype._beginMeasure = function () {
        return this._driverExtension.timeBegin(this._markName(this._measureCount++));
    };
    PerflogMetric.prototype._endMeasure = function (restart) {
        var _this = this;
        var markName = this._markName(this._measureCount - 1);
        var nextMarkName = restart ? this._markName(this._measureCount++) : null;
        return this._driverExtension.timeEnd(markName, nextMarkName)
            .then(function (_) { return _this._readUntilEndMark(markName); });
    };
    PerflogMetric.prototype._readUntilEndMark = function (markName, loopCount, startEvent) {
        var _this = this;
        if (loopCount === void 0) { loopCount = 0; }
        if (startEvent === void 0) { startEvent = null; }
        if (loopCount > _MAX_RETRY_COUNT) {
            throw new Error("Tried too often to get the ending mark: " + loopCount);
        }
        return this._driverExtension.readPerfLog().then(function (events) {
            _this._addEvents(events);
            var result = _this._aggregateEvents(_this._remainingEvents, markName);
            if (result) {
                _this._remainingEvents = events;
                return result;
            }
            var resolve;
            var promise = new Promise(function (res) { resolve = res; });
            _this._setTimeout(function () { return resolve(_this._readUntilEndMark(markName, loopCount + 1)); }, 100);
            return promise;
        });
    };
    PerflogMetric.prototype._addEvents = function (events) {
        var _this = this;
        var needSort = false;
        events.forEach(function (event) {
            if (event['ph'] === 'X') {
                needSort = true;
                var startEvent = {};
                var endEvent = {};
                for (var prop in event) {
                    startEvent[prop] = event[prop];
                    endEvent[prop] = event[prop];
                }
                startEvent['ph'] = 'B';
                endEvent['ph'] = 'E';
                endEvent['ts'] = startEvent['ts'] + startEvent['dur'];
                _this._remainingEvents.push(startEvent);
                _this._remainingEvents.push(endEvent);
            }
            else {
                _this._remainingEvents.push(event);
            }
        });
        if (needSort) {
            // Need to sort because of the ph==='X' events
            this._remainingEvents.sort(function (a, b) {
                var diff = a['ts'] - b['ts'];
                return diff > 0 ? 1 : diff < 0 ? -1 : 0;
            });
        }
    };
    PerflogMetric.prototype._aggregateEvents = function (events, markName) {
        var _this = this;
        var result = { 'scriptTime': 0, 'pureScriptTime': 0 };
        if (this._perfLogFeatures.gc) {
            result['gcTime'] = 0;
            result['majorGcTime'] = 0;
            result['gcAmount'] = 0;
        }
        if (this._perfLogFeatures.render) {
            result['renderTime'] = 0;
        }
        if (this._captureFrames) {
            result['frameTime.mean'] = 0;
            result['frameTime.best'] = 0;
            result['frameTime.worst'] = 0;
            result['frameTime.smooth'] = 0;
        }
        for (var name_2 in this._microMetrics) {
            result[name_2] = 0;
        }
        if (this._receivedData) {
            result['receivedData'] = 0;
        }
        if (this._requestCount) {
            result['requestCount'] = 0;
        }
        var markStartEvent = null;
        var markEndEvent = null;
        events.forEach(function (event) {
            var ph = event['ph'];
            var name = event['name'];
            if (ph === 'B' && name === markName) {
                markStartEvent = event;
            }
            else if (ph === 'I' && name === 'navigationStart') {
                // if a benchmark measures reload of a page, use the last
                // navigationStart as begin event
                markStartEvent = event;
            }
            else if (ph === 'E' && name === markName) {
                markEndEvent = event;
            }
        });
        if (!markStartEvent || !markEndEvent) {
            // not all events have been received, no further processing for now
            return null;
        }
        var gcTimeInScript = 0;
        var renderTimeInScript = 0;
        var frameTimestamps = [];
        var frameTimes = [];
        var frameCaptureStartEvent = null;
        var frameCaptureEndEvent = null;
        var intervalStarts = {};
        var intervalStartCount = {};
        var inMeasureRange = false;
        events.forEach(function (event) {
            var ph = event['ph'];
            var name = event['name'];
            var microIterations = 1;
            var microIterationsMatch = name.match(_MICRO_ITERATIONS_REGEX);
            if (microIterationsMatch) {
                name = microIterationsMatch[1];
                microIterations = parseInt(microIterationsMatch[2], 10);
            }
            if (event === markStartEvent) {
                inMeasureRange = true;
            }
            else if (event === markEndEvent) {
                inMeasureRange = false;
            }
            if (!inMeasureRange || event['pid'] !== markStartEvent['pid']) {
                return;
            }
            if (_this._requestCount && name === 'sendRequest') {
                result['requestCount'] += 1;
            }
            else if (_this._receivedData && name === 'receivedData' && ph === 'I') {
                result['receivedData'] += event['args']['encodedDataLength'];
            }
            if (ph === 'B' && name === _MARK_NAME_FRAME_CAPUTRE) {
                if (frameCaptureStartEvent) {
                    throw new Error('can capture frames only once per benchmark run');
                }
                if (!_this._captureFrames) {
                    throw new Error('found start event for frame capture, but frame capture was not requested in benchpress');
                }
                frameCaptureStartEvent = event;
            }
            else if (ph === 'E' && name === _MARK_NAME_FRAME_CAPUTRE) {
                if (!frameCaptureStartEvent) {
                    throw new Error('missing start event for frame capture');
                }
                frameCaptureEndEvent = event;
            }
            if (ph === 'I' && frameCaptureStartEvent && !frameCaptureEndEvent && name === 'frame') {
                frameTimestamps.push(event['ts']);
                if (frameTimestamps.length >= 2) {
                    frameTimes.push(frameTimestamps[frameTimestamps.length - 1] -
                        frameTimestamps[frameTimestamps.length - 2]);
                }
            }
            if (ph === 'B') {
                if (!intervalStarts[name]) {
                    intervalStartCount[name] = 1;
                    intervalStarts[name] = event;
                }
                else {
                    intervalStartCount[name]++;
                }
            }
            else if ((ph === 'E') && intervalStarts[name]) {
                intervalStartCount[name]--;
                if (intervalStartCount[name] === 0) {
                    var startEvent = intervalStarts[name];
                    var duration = (event['ts'] - startEvent['ts']);
                    intervalStarts[name] = null;
                    if (name === 'gc') {
                        result['gcTime'] += duration;
                        var amount = (startEvent['args']['usedHeapSize'] - event['args']['usedHeapSize']) / 1000;
                        result['gcAmount'] += amount;
                        var majorGc = event['args']['majorGc'];
                        if (majorGc && majorGc) {
                            result['majorGcTime'] += duration;
                        }
                        if (intervalStarts['script']) {
                            gcTimeInScript += duration;
                        }
                    }
                    else if (name === 'render') {
                        result['renderTime'] += duration;
                        if (intervalStarts['script']) {
                            renderTimeInScript += duration;
                        }
                    }
                    else if (name === 'script') {
                        result['scriptTime'] += duration;
                    }
                    else if (_this._microMetrics[name]) {
                        result[name] += duration / microIterations;
                    }
                }
            }
        });
        if (frameCaptureStartEvent && !frameCaptureEndEvent) {
            throw new Error('missing end event for frame capture');
        }
        if (this._captureFrames && !frameCaptureStartEvent) {
            throw new Error('frame capture requested in benchpress, but no start event was found');
        }
        if (frameTimes.length > 0) {
            this._addFrameMetrics(result, frameTimes);
        }
        result['pureScriptTime'] = result['scriptTime'] - gcTimeInScript - renderTimeInScript;
        return result;
    };
    PerflogMetric.prototype._addFrameMetrics = function (result, frameTimes) {
        result['frameTime.mean'] = frameTimes.reduce(function (a, b) { return a + b; }, 0) / frameTimes.length;
        var firstFrame = frameTimes[0];
        result['frameTime.worst'] = frameTimes.reduce(function (a, b) { return a > b ? a : b; }, firstFrame);
        result['frameTime.best'] = frameTimes.reduce(function (a, b) { return a < b ? a : b; }, firstFrame);
        result['frameTime.smooth'] =
            frameTimes.filter(function (t) { return t < _FRAME_TIME_SMOOTH_THRESHOLD; }).length / frameTimes.length;
    };
    PerflogMetric.prototype._markName = function (index) { return "" + _MARK_NAME_PREFIX + index; };
    PerflogMetric.SET_TIMEOUT = new core_1.OpaqueToken('PerflogMetric.setTimeout');
    PerflogMetric.PROVIDERS = [
        PerflogMetric, {
            provide: PerflogMetric.SET_TIMEOUT,
            useValue: function (fn, millis) { return setTimeout(fn, millis); }
        }
    ];
    PerflogMetric.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PerflogMetric.ctorParameters = [
        { type: web_driver_extension_1.WebDriverExtension, },
        { type: Function, decorators: [{ type: core_1.Inject, args: [PerflogMetric.SET_TIMEOUT,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.MICRO_METRICS,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.FORCE_GC,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.CAPTURE_FRAMES,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.RECEIVED_DATA,] },] },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [common_options_1.Options.REQUEST_COUNT,] },] },
    ];
    return PerflogMetric;
}(metric_1.Metric));
exports.PerflogMetric = PerflogMetric;
var _MICRO_ITERATIONS_REGEX = /(.+)\*(\d+)$/;
var _MAX_RETRY_COUNT = 20;
var _MARK_NAME_PREFIX = 'benchpress';
var _MARK_NAME_FRAME_CAPUTRE = 'frameCapture';
// using 17ms as a somewhat looser threshold, instead of 16.6666ms
var _FRAME_TIME_SMOOTH_THRESHOLD = 17;
//# sourceMappingURL=perflog_metric.js.map