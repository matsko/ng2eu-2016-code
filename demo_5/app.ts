import {
    Component,
    trigger,
    state,
    transition,
    keyframes,
    group,
    animate,
    style,
    sequence
} from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['demo_5/app.css'],
  templateUrl: 'demo_5/app.html',
  animations: [
    trigger('flex', [
      state('1', style({ width: '100%' })),
      state('2', style({ width: '50%' })),
      state('3', style({ width: '33.3%' })),
      state('4', style({ width: '25%' })),
      state('even', style({ width: '10%' })),
      transition('* => *', animate(500))
    ]),
    trigger('evenOdd', [
      state('even', style({ background: 'red' }))
    ])
  ]
})
export class App {
  col = 2;

  items = [1,2,3,4,5,6];

  evenOdd = false;

  setCol(value) {
    this.col = value;
    if (value == 4) {
      if (this.items.length < 8) {
        this.items.push(7);
        this.items.push(8);
      }
    } else {
      this.items.length = 6;
    }
  }

  get className() {
    return `content cols col-${this.col} ${this.evenOdd ? 'even' : ''}`;
  }
}
