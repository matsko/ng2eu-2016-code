/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken } from '@angular/core';
import { Metric } from '../metric';
import { WebDriverExtension } from '../web_driver_extension';
/**
 * A metric that reads out the performance log
 */
export declare class PerflogMetric extends Metric {
    private _driverExtension;
    private _setTimeout;
    private _microMetrics;
    private _forceGc;
    private _captureFrames;
    private _receivedData;
    private _requestCount;
    static SET_TIMEOUT: OpaqueToken;
    static PROVIDERS: (typeof PerflogMetric | {
        provide: OpaqueToken;
        useValue: (fn: Function, millis: number) => any;
    })[];
    private _remainingEvents;
    private _measureCount;
    private _perfLogFeatures;
    /**
     * @param driverExtension
     * @param setTimeout
     * @param microMetrics Name and description of metrics provided via console.time / console.timeEnd
     **/
    constructor(_driverExtension: WebDriverExtension, _setTimeout: Function, _microMetrics: {
        [key: string]: string;
    }, _forceGc: boolean, _captureFrames: boolean, _receivedData: boolean, _requestCount: boolean);
    describe(): {
        [key: string]: string;
    };
    beginMeasure(): Promise<any>;
    endMeasure(restart: boolean): Promise<{
        [key: string]: number;
    }>;
    /** @internal */
    private _endPlainMeasureAndMeasureForceGc(restartMeasure);
    private _beginMeasure();
    private _endMeasure(restart);
    private _readUntilEndMark(markName, loopCount?, startEvent?);
    private _addEvents(events);
    private _aggregateEvents(events, markName);
    private _addFrameMetrics(result, frameTimes);
    private _markName(index);
}
