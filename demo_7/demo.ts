import {Component, HostBinding} from '@angular/core';
import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_7',
    styles: [`
        :host {
            display:block;
            position:fixed;
            top:0;
            right:0;
            bottom:0;
            left:0;
            display:block;
            background:url(./demo_7/bg.jpg);
        }
    `]
    animations: [routerAnimations('routeAnimations')],
    templateUrl: 'demo_7/demo.html'
})
export class Demo7 {
    @HostBinding('@routeAnimations')
    public routeAnimations = true;
    constructor() {
    }
}
