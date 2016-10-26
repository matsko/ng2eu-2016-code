import {App} from './app';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    bootstrap: [App],
    declarations: [App],
    imports: [BrowserModule]
})
export class AppModule { }
