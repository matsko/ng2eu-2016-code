var RUNTIME_FILE = 'bootstrap.runtime.ts';
var AOT_FILE = 'bootstrap.aot.ts';

function parseQS(searchStr) {
  var values = {};
  searchStr.split('&').forEach(function(token) {
    var tuple = token.split('=');
    values[tuple[0]] = tuple[1] || true;
  });
  return values;
}

var searchValue = window.location.search;
var qsValues = parseQS(searchValue.length ? searchValue.substr(1) : "");

var mainFile = RUNTIME_FILE;
var href = window.location.href;
if (qsValues.aot) {
  mainFile = AOT_FILE;
}

var mappings = {
  index: '.',
  '@angular': './@angular',
  'rxjs': 'https://npmcdn.com/rxjs@5.0.0-beta.6'
};

var mainSha = 'master';
if (qsValues.sha && qsValues.sha != 'local') {
  mainSha = qsValues.sha.toLowerCase();
  mappings['@angular'] = 'https://cdn.rawgit.com/angular';
  mappings['@angular/core'] = 'https://cdn.rawgit.com/angular/core-builds/' + mainSha;
  mappings['@angular/common'] = 'https://cdn.rawgit.com/angular/common-builds/' + mainSha;
  mappings['@angular/compiler'] = 'https://cdn.rawgit.com/angular/compiler-builds/' + mainSha;
  mappings['@angular/forms'] = 'https://cdn.rawgit.com/angular/forms-builds/' + mainSha;
  mappings['@angular/platform-browser'] = 'https://cdn.rawgit.com/angular/platform-browser-builds/' + mainSha;
  mappings['@angular/platform-browser-dynamic'] = 'https://cdn.rawgit.com/angular/platform-browser-dynamic-builds/' + mainSha;
  mappings['@angular/router'] = 'https://cdn.rawgit.com/angular/router-builds/' + mainSha;
  mappings['@angular/http'] = 'https://cdn.rawgit.com/angular/http-builds/' + mainSha;
}

var packages = {
  '@angular/core': {main: 'index.js', defaultExtension: 'js'},
  '@angular/compiler': {main: 'index.js', defaultExtension: 'js'},
  '@angular/router': {main: 'index.js', defaultExtension: 'js'},
  '@angular/common': {main: 'index.js', defaultExtension: 'js'},
  '@angular/forms': {main: 'index.js', defaultExtension: 'js'},
  '@angular/http': {main: 'index.js', defaultExtension: 'js'},
  '@angular/platform-browser': {main: 'index.js', defaultExtension: 'js'},
  '@angular/platform-browser-dynamic': {main: 'index.js', defaultExtension: 'js'},
  rxjs: {
    defaultExtension: 'js'
  },
  index: {
    main: mainFile,
    defaultExtension: 'ts'
  }
};

if (qsValues.bundle) {
  packages['@angular/core']['main'] = 'bundles/core.umd.js';
  packages['@angular/compiler']['main'] = 'bundles/compiler.umd.js';
  packages['@angular/router']['main'] = 'bundles/router.umd.js';
  packages['@angular/common']['main'] = 'bundles/common.umd.js';
  packages['@angular/forms']['main'] = 'bundles/forms.umd.js';
  packages['@angular/http']['main'] = 'bundles/http.umd.js';
  packages['@angular/platform-browser']['main'] = 'bundles/platform-browser.umd.js';
  packages['@angular/platform-browser-dynamic']['main'] = 'bundles/platform-browser-dynamic.umd.js';
}

System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  map: mappings,
  packages: packages
});
