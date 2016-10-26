/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A WebDriverAdapter bridges API differences between different WebDriver clients,
 * e.g. JS vs Dart Async vs Dart Sync webdriver.
 * Needs one implementation for every supported WebDriver client.
 */
export declare abstract class WebDriverAdapter {
    waitFor(callback: Function): Promise<any>;
    executeScript(script: string): Promise<any>;
    executeAsyncScript(script: string): Promise<any>;
    capabilities(): Promise<{
        [key: string]: any;
    }>;
    logs(type: string): Promise<any[]>;
}
