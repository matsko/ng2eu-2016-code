import {Component, NgModule, animate, state, style, transition, trigger} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

const ITEMS = [
  { count: 1, name: "janvier"},
  { count: 2, name: "février"},
  { count: 3, name: "mars"},
  { count: 4, name: "avril"},
  { count: 5, name: "mai"},
  { count: 6, name: "juin"},
  { count: 7, name: "juillet"},
  { count: 8, name: "août"},
  { count: 9, name: "septembre"},
  { count: 10, name: "octobre"},
  { count: 11, name: "novembre"},
  { count: 12, name: "décembre"}
]

@Component({
  selector: 'ng-for-example',
  styleUrls: ['./demo_1/app.css'],
  templateUrl: './demo_1/app.html',
  animations: [
      trigger('monthAnimation', [
          transition(':enter', [
             style({ opacity: 0, width: 0 }),
             animate(500, style({ width: '20%', opacity: 1 }))
          ]),
          transition(':leave', [
            animate(500, style({ opacity: 0, width: 0 }))
          ])
      ])
  ]
})
export class ExampleApp {
  items: any[] = [];

  constructor() {
    this.showAll();
  }

  showAll() {
    this.items = ITEMS;
  }

  hideAll() {
    this.items = [];
  }

  resolveClassName(first: boolean, last:boolean, even: boolean, odd: boolean): string {
    var className = 'cell';
    if (first) className += ' first-record';
    else if (last) className += ' last-record';
    else if (even) className += ' even-record';
    else if (odd) className += ' odd-record';
    return className;
  }

  evenMonths() {
    this.showAll();
    this.items = this.items.filter((value, i) => {
      return i % 2 == 0;
    })
  }

  oddMonths() {
    this.showAll();
    this.items = this.items.filter((value, i) => {
      return i % 2 == 1;
    })
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [ExampleApp],
  bootstrap: [ExampleApp]
})
export class AppModule {
}
