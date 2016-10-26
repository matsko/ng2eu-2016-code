import {Demo7} from './demo';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InstallerCmp} from './installer_cmp';

@NgModule({
    bootstrap: [Demo7],
    declarations: [Demo7, InstallerCmp],
    imports: [BrowserModule]
})
export class Demo7Module { }
