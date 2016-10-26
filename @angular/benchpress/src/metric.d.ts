/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A metric is measures values
 */
export declare abstract class Metric {
    /**
     * Starts measuring
     */
    beginMeasure(): Promise<any>;
    /**
     * Ends measuring and reports the data
     * since the begin call.
     * @param restart: Whether to restart right after this.
     */
    endMeasure(restart: boolean): Promise<{
        [key: string]: any;
    }>;
    /**
     * Describes the metrics provided by this metric implementation.
     * (e.g. units, ...)
     */
    describe(): {
        [key: string]: string;
    };
}
