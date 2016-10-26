import {Demo4} from './demo';
import {App} from './app';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    bootstrap: [Demo4],
    declarations: [Demo4, App],
    imports: [BrowserModule]
})
export class Demo4Module { }
