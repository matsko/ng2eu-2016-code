import {Demo3} from './demo';
import {NgModule} from '@angular/core';
import {ImagePreview} from './image_preview';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    bootstrap: [Demo3],
    declarations: [Demo3, ImagePreview],
    imports: [BrowserModule]
})
export class Demo3Module { }
