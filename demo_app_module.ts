import {DemoApp} from './demo_app';
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { DemoRoutes } from 'demo_routes';
import { Demo1Module } from 'demo_1/demo_module';
import { Demo2Module } from 'demo_2/demo_module';
import { Demo3Module } from 'demo_3/demo_module';
import { Demo4Module } from 'demo_4/demo_module';
import { Demo5Module } from 'demo_5/demo_module';
import { Demo6Module } from 'demo_6/demo_module';
import { Demo7Module } from 'demo_7/demo_module';

import {APP_BASE_HREF} from '@angular/common';

@NgModule({
    bootstrap: [DemoApp],
    declarations: [DemoApp],
    imports: [
      BrowserModule,
      DemoRoutes,
      Demo1Module,
      Demo2Module,
      Demo3Module,
      Demo4Module,
      Demo5Module,
      Demo6Module,
      Demo7Module
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/ac_presentation' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class DemoAppModule { }
