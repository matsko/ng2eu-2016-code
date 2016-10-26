/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export declare class Statistic {
    static calculateCoefficientOfVariation(sample: number[], mean: number): number;
    static calculateMean(samples: number[]): number;
    static calculateStandardDeviation(samples: number[], mean: number): number;
    static calculateRegressionSlope(xValues: number[], xMean: number, yValues: number[], yMean: number): number;
}
