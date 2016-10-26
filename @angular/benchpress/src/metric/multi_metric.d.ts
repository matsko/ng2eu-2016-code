import { Metric } from '../metric';
export declare class MultiMetric extends Metric {
    private _metrics;
    static provideWith(childTokens: any[]): any[];
    constructor(_metrics: Metric[]);
    /**
     * Starts measuring
     */
    beginMeasure(): Promise<any>;
    /**
     * Ends measuring and reports the data
     * since the begin call.
     * @param restart: Whether to restart right after this.
     */
    endMeasure(restart: boolean): Promise<{
        [key: string]: any;
    }>;
    /**
     * Describes the metrics provided by this metric implementation.
     * (e.g. units, ...)
     */
    describe(): {
        [key: string]: any;
    };
}
