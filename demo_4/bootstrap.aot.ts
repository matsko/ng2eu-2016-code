import {AppModuleNgFactory} from './app_module.ngfactory';
import {platformBrowser} from '@angular/platform-browser';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);