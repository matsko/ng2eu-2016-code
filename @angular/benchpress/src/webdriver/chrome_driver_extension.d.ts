import { WebDriverAdapter } from '../web_driver_adapter';
import { PerfLogEvent, PerfLogFeatures, WebDriverExtension } from '../web_driver_extension';
/**
 * Set the following 'traceCategories' to collect metrics in Chrome:
 * 'v8,blink.console,disabled-by-default-devtools.timeline,devtools.timeline,blink.user_timing'
 *
 * In order to collect the frame rate related metrics, add 'benchmark'
 * to the list above.
 */
export declare class ChromeDriverExtension extends WebDriverExtension {
    private _driver;
    static PROVIDERS: typeof ChromeDriverExtension[];
    private _majorChromeVersion;
    constructor(_driver: WebDriverAdapter, userAgent: string);
    private _parseChromeVersion(userAgent);
    gc(): Promise<any>;
    timeBegin(name: string): Promise<any>;
    timeEnd(name: string, restartName?: string): Promise<any>;
    readPerfLog(): Promise<PerfLogEvent[]>;
    private _convertPerfRecordsToEvents(chromeEvents, normalizedEvents?);
    private _convertEvent(event, categories);
    private _parseCategories(categories);
    private _isEvent(eventCategories, eventName, expectedCategories, expectedName?);
    perfLogFeatures(): PerfLogFeatures;
    supports(capabilities: {
        [key: string]: any;
    }): boolean;
}
