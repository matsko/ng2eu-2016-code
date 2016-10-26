import {
    Component,
    HostBinding
} from '@angular/core';

import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_4',
    templateUrl: './demo_4/demo.html',
    styles: [`:host{display:block;}`],
    animations: [routerAnimations('routeAnimations')]
})
export class Demo4 {
    @HostBinding('@routeAnimations')
    public animatePage = true;
}
