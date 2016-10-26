/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MeasureValues } from '../measure_values';
export declare function formatNum(n: number): string;
export declare function sortedProps(obj: {
    [key: string]: any;
}): string[];
export declare function formatStats(validSamples: MeasureValues[], metricName: string): string;
