import {Component, HostBinding} from '@angular/core';
import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_1',
    animations: [routerAnimations('routeAnimations')],
    templateUrl: 'demo_1/demo.html'
})
export class Demo1 {
    @HostBinding('@routeAnimations')
    public routeAnimations = true;
    constructor() {
    }
}
