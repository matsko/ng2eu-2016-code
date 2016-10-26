/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_options_1 = require('./common_options');
var metric_1 = require('./metric');
var validator_1 = require('./validator');
/**
 * SampleDescription merges all available descriptions about a sample
 */
var SampleDescription = (function () {
    function SampleDescription(id, descriptions, metrics) {
        var _this = this;
        this.id = id;
        this.metrics = metrics;
        this.description = {};
        descriptions.forEach(function (description) {
            Object.keys(description).forEach(function (prop) { _this.description[prop] = description[prop]; });
        });
    }
    SampleDescription.prototype.toJson = function () { return { 'id': this.id, 'description': this.description, 'metrics': this.metrics }; };
    SampleDescription.PROVIDERS = [{
            provide: SampleDescription,
            useFactory: function (metric, id, forceGc, userAgent, validator, defaultDesc, userDesc) {
                return new SampleDescription(id, [
                    { 'forceGc': forceGc, 'userAgent': userAgent }, validator.describe(), defaultDesc,
                    userDesc
                ], metric.describe());
            },
            deps: [
                metric_1.Metric, common_options_1.Options.SAMPLE_ID, common_options_1.Options.FORCE_GC, common_options_1.Options.USER_AGENT, validator_1.Validator,
                common_options_1.Options.DEFAULT_DESCRIPTION, common_options_1.Options.SAMPLE_DESCRIPTION
            ]
        }];
    return SampleDescription;
}());
exports.SampleDescription = SampleDescription;
//# sourceMappingURL=sample_description.js.map