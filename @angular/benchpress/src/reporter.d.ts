/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { MeasureValues } from './measure_values';
/**
 * A reporter reports measure values and the valid sample.
 */
export declare abstract class Reporter {
    reportMeasureValues(values: MeasureValues): Promise<any>;
    reportSample(completeSample: MeasureValues[], validSample: MeasureValues[]): Promise<any>;
}
