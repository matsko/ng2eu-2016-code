/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken } from '@angular/core';
import { MeasureValues } from '../measure_values';
import { Reporter } from '../reporter';
import { SampleDescription } from '../sample_description';
/**
 * A reporter that writes results into a json file.
 */
export declare class JsonFileReporter extends Reporter {
    private _description;
    private _path;
    private _writeFile;
    private _now;
    static PATH: OpaqueToken;
    static PROVIDERS: (typeof JsonFileReporter | {
        provide: OpaqueToken;
        useValue: string;
    })[];
    constructor(_description: SampleDescription, _path: string, _writeFile: Function, _now: Function);
    reportMeasureValues(measureValues: MeasureValues): Promise<any>;
    reportSample(completeSample: MeasureValues[], validSample: MeasureValues[]): Promise<any>;
}
