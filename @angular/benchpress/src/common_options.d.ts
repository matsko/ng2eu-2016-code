/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken } from '@angular/core';
export declare class Options {
    static SAMPLE_ID: OpaqueToken;
    static DEFAULT_DESCRIPTION: OpaqueToken;
    static SAMPLE_DESCRIPTION: OpaqueToken;
    static FORCE_GC: OpaqueToken;
    static NO_PREPARE: () => boolean;
    static PREPARE: OpaqueToken;
    static EXECUTE: OpaqueToken;
    static CAPABILITIES: OpaqueToken;
    static USER_AGENT: OpaqueToken;
    static MICRO_METRICS: OpaqueToken;
    static USER_METRICS: OpaqueToken;
    static NOW: OpaqueToken;
    static WRITE_FILE: OpaqueToken;
    static RECEIVED_DATA: OpaqueToken;
    static REQUEST_COUNT: OpaqueToken;
    static CAPTURE_FRAMES: OpaqueToken;
    static DEFAULT_PROVIDERS: {
        provide: OpaqueToken;
        useValue: {};
    }[];
}
