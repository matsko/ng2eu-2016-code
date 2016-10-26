/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken } from '@angular/core';
import { Metric } from './metric';
import { Validator } from './validator';
/**
 * SampleDescription merges all available descriptions about a sample
 */
export declare class SampleDescription {
    id: string;
    metrics: {
        [key: string]: any;
    };
    static PROVIDERS: {
        provide: typeof SampleDescription;
        useFactory: (metric: Metric, id: string, forceGc: boolean, userAgent: string, validator: Validator, defaultDesc: {
            [key: string]: string;
        }, userDesc: {
            [key: string]: string;
        }) => SampleDescription;
        deps: (OpaqueToken | typeof Metric | typeof Validator)[];
    }[];
    description: {
        [key: string]: any;
    };
    constructor(id: string, descriptions: Array<{
        [key: string]: any;
    }>, metrics: {
        [key: string]: any;
    });
    toJson(): {
        'id': string;
        'description': {
            [key: string]: any;
        };
        'metrics': {
            [key: string]: any;
        };
    };
}
