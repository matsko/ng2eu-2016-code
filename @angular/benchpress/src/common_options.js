/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var fs = require('fs');
var Options = (function () {
    function Options() {
    }
    Options.SAMPLE_ID = new core_1.OpaqueToken('Options.sampleId');
    Options.DEFAULT_DESCRIPTION = new core_1.OpaqueToken('Options.defaultDescription');
    Options.SAMPLE_DESCRIPTION = new core_1.OpaqueToken('Options.sampleDescription');
    Options.FORCE_GC = new core_1.OpaqueToken('Options.forceGc');
    Options.NO_PREPARE = function () { return true; };
    Options.PREPARE = new core_1.OpaqueToken('Options.prepare');
    Options.EXECUTE = new core_1.OpaqueToken('Options.execute');
    Options.CAPABILITIES = new core_1.OpaqueToken('Options.capabilities');
    Options.USER_AGENT = new core_1.OpaqueToken('Options.userAgent');
    Options.MICRO_METRICS = new core_1.OpaqueToken('Options.microMetrics');
    Options.USER_METRICS = new core_1.OpaqueToken('Options.userMetrics');
    Options.NOW = new core_1.OpaqueToken('Options.now');
    Options.WRITE_FILE = new core_1.OpaqueToken('Options.writeFile');
    Options.RECEIVED_DATA = new core_1.OpaqueToken('Options.receivedData');
    Options.REQUEST_COUNT = new core_1.OpaqueToken('Options.requestCount');
    Options.CAPTURE_FRAMES = new core_1.OpaqueToken('Options.frameCapture');
    Options.DEFAULT_PROVIDERS = [
        { provide: Options.DEFAULT_DESCRIPTION, useValue: {} },
        { provide: Options.SAMPLE_DESCRIPTION, useValue: {} },
        { provide: Options.FORCE_GC, useValue: false },
        { provide: Options.PREPARE, useValue: Options.NO_PREPARE },
        { provide: Options.MICRO_METRICS, useValue: {} }, { provide: Options.USER_METRICS, useValue: {} },
        { provide: Options.NOW, useValue: function () { return new Date(); } },
        { provide: Options.RECEIVED_DATA, useValue: false },
        { provide: Options.REQUEST_COUNT, useValue: false },
        { provide: Options.CAPTURE_FRAMES, useValue: false },
        { provide: Options.WRITE_FILE, useValue: writeFile }
    ];
    return Options;
}());
exports.Options = Options;
function writeFile(filename, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filename, content, function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
//# sourceMappingURL=common_options.js.map