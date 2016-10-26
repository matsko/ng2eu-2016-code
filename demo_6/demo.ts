import {
    Component,
    HostBinding
} from '@angular/core';

import {default as routerAnimations} from '../route_animations';

@Component({
    selector: 'demo_6',
    host: {
        '(click)': 'showModal=false'
    },
    styleUrls: ['demo_6/app.css'],
    animations: [routerAnimations('route')],
    template: `
        <nav class="navigation">
            <button (click)="$event.stopPropagation(); showModal=true">Show Modal</button> 
        </nav>
        
        <modal *ngIf="showModal" (close)="showModal=false"></modal>
    `
})
export class Demo6 {
    @HostBinding('@route')
    public routeAnimations = true;
}
