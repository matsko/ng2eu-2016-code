/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Provider } from '@angular/core';
import { SampleState } from './sampler';
/**
 * The Runner is the main entry point for executing a sample run.
 * It provides defaults, creates the injector and calls the sampler.
 */
export declare class Runner {
    private _defaultProviders;
    constructor(_defaultProviders?: Provider[]);
    sample({id, execute, prepare, microMetrics, providers, userMetrics}: {
        id: string;
        execute?: Function;
        prepare?: Function;
        microMetrics?: {
            [key: string]: string;
        };
        providers?: Provider[];
        userMetrics?: {
            [key: string]: string;
        };
    }): Promise<SampleState>;
}
