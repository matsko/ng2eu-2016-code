/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { WebDriverAdapter } from '../web_driver_adapter';
/**
 * Adapter for the selenium-webdriver.
 */
export declare class SeleniumWebDriverAdapter extends WebDriverAdapter {
    private _driver;
    static PROTRACTOR_PROVIDERS: {
        provide: typeof WebDriverAdapter;
        useFactory: () => SeleniumWebDriverAdapter;
    }[];
    constructor(_driver: any);
    waitFor(callback: () => any): Promise<any>;
    executeScript(script: string): Promise<any>;
    executeAsyncScript(script: string): Promise<any>;
    capabilities(): Promise<{
        [key: string]: any;
    }>;
    logs(type: string): Promise<any>;
}
