import { MeasureValues } from '../measure_values';
import { Reporter } from '../reporter';
export declare class MultiReporter extends Reporter {
    private _reporters;
    static provideWith(childTokens: any[]): any[];
    constructor(_reporters: Reporter[]);
    reportMeasureValues(values: MeasureValues): Promise<any[]>;
    reportSample(completeSample: MeasureValues[], validSample: MeasureValues[]): Promise<any[]>;
}
