import { MeasureValues } from './measure_values';
import { Metric } from './metric';
import { Reporter } from './reporter';
import { Validator } from './validator';
import { WebDriverAdapter } from './web_driver_adapter';
/**
 * The Sampler owns the sample loop:
 * 1. calls the prepare/execute callbacks,
 * 2. gets data from the metric
 * 3. asks the validator for a valid sample
 * 4. reports the new data to the reporter
 * 5. loop until there is a valid sample
 */
export declare class Sampler {
    private _driver;
    private _metric;
    private _reporter;
    private _validator;
    private _prepare;
    private _execute;
    private _now;
    static PROVIDERS: typeof Sampler[];
    constructor(_driver: WebDriverAdapter, _metric: Metric, _reporter: Reporter, _validator: Validator, _prepare: Function, _execute: Function, _now: Function);
    sample(): Promise<SampleState>;
    private _iterate(lastState);
    private _report(state, metricValues);
}
export declare class SampleState {
    completeSample: MeasureValues[];
    validSample: MeasureValues[];
    constructor(completeSample: MeasureValues[], validSample: MeasureValues[]);
}
