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
 * A validator that waits for the sample to have a certain size.
 */
export declare class SizeValidator extends Validator {
    private _sampleSize;
    static SAMPLE_SIZE: OpaqueToken;
    static PROVIDERS: (typeof SizeValidator | {
        provide: OpaqueToken;
        useValue: number;
    })[];
    constructor(_sampleSize: number);
    describe(): {
        [key: string]: any;
    };
    validate(completeSample: MeasureValues[]): MeasureValues[];
}
