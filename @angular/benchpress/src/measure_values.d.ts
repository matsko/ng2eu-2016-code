/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare class MeasureValues {
    runIndex: number;
    timeStamp: Date;
    values: {
        [key: string]: any;
    };
    constructor(runIndex: number, timeStamp: Date, values: {
        [key: string]: any;
    });
    toJson(): {
        'timeStamp': string;
        'runIndex': number;
        'values': {
            [key: string]: any;
        };
    };
}
