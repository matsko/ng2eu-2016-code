import {Demo5} from './demo';
import {NgModule} from '@angular/core';
import {App} from './app';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    bootstrap: [Demo5],
    declarations: [Demo5, App],
    imports: [BrowserModule]
})
export class Demo5Module { }
