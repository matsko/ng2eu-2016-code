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
    styleUrls: ['demo_4/app.css'],
    templateUrl: 'demo_4/app.html'
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
