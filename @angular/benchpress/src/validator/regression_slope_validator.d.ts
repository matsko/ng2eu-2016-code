/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken } from '@angular/core';
import { MeasureValues } from '../measure_values';
import { Validator } from '../validator';
/**
 * A validator that checks the regression slope of a specific metric.
 * Waits for the regression slope to be >=0.
 */
export declare class RegressionSlopeValidator extends Validator {
    private _sampleSize;
    private _metric;
    static SAMPLE_SIZE: OpaqueToken;
    static METRIC: OpaqueToken;
    static PROVIDERS: (typeof RegressionSlopeValidator | {
        provide: OpaqueToken;
        useValue: number;
    } | {
        provide: OpaqueToken;
        useValue: string;
    })[];
    constructor(_sampleSize: number, _metric: string);
    describe(): {
        [key: string]: any;
    };
    validate(completeSample: MeasureValues[]): MeasureValues[];
}
