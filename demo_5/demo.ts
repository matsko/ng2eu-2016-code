import {
    Component,
    HostBinding
} from '@angular/core';

import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_5',
    templateUrl: './demo_5/demo.html',
    styles: [`:host{display:block;}`],
    animations: [routerAnimations('routeAnimations')]
})
export class Demo5 {
    @HostBinding('@routeAnimations')
    public animatePage = true;
}
