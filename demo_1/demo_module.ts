import {Demo1} from './demo';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ExampleApp} from './app';

@NgModule({
    bootstrap: [Demo1],
    declarations: [Demo1, ExampleApp],
    imports: [BrowserModule]
})
export class Demo1Module { }
