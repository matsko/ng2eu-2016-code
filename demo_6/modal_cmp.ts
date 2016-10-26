import {
    Component,
    EventEmitter,
    Output,
    trigger,
    state,
    transition,
    keyframes,
    group,
    animate,
    query,
    group,
    style
} from '@angular/core';

@Component({
    selector: 'modal',
    styleUrls: ['demo_6/modal_cmp.css'],
    templateUrl: 'demo_6/modal_cmp.html',
    animations: [
        trigger('showScreen', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ])
        ]),
        trigger('showModal', [
            transition('void => *', [
                group([
                    style({ opacity: 0 }),
                    query('header', style({ opacity: 0 })),
                    query('body', style({ opacity: 0 })),
                    query('footer', style({ opacity: 0 })),
                    query('close', style({ opacity: 0 }))
                ]),
                group([
                    style({ height: 200, width: '30%', transform: 'translateX(-50%) translateY(-70%)' }),
                    animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(-50%) translateY(-50%)' })),
                    query('header', [
                        animate('0.8s 150ms cubic-bezier(.48,.1,.51,1)', keyframes([
                            style({ opacity: 0, transform: 'translateY(-100px)', offset: 0 }),
                            style({ transform: 'scale(1)', offset: 0.75 }),
                            style({ opacity:1, offset: 1 })
                        ]))
                    ]),
                    query('body', [
                        animate('0.8s 400ms cubic-bezier(.48,.1,.51,1)', keyframes([
                            style({ opacity: 0, transform: 'translateY(-100px)', offset: 0 }),
                            style({ transform: 'scale(1)', offset: 0.75 }),
                            style({ opacity: 1, offset: 1 })
                        ]))
                    ]),
                    query('footer', [
                        animate('0.8s 500ms cubic-bezier(.48,.1,.51,1)', keyframes([
                            style({ opacity: 0, transform: 'translateY(-100px)', offset: 0 }),
                            style({ transform: 'scale(1)', offset: 0.75 }),
                            style({ opacity: 1, offset: 1 })
                        ]))
                    ]),
                    query('close', [
                        animate('0.5s 400ms', keyframes([
                            style({ opacity: 0, transform: 'scale(1.2)', offset: 0 }),
                            style({ opacity: 1, transform: 'scale(1)', offset: 1 })
                        ]))
                    ]),
                    animate('500ms cubic-bezier(.29,.55,.53,1.53)', style({ height: '*', width: '*' })),
                ]),
            ])
        ])
    ]
})
export class ModalCmp {
    @Output("close")
    closeEvent = new EventEmitter();

    close() {
        this.closeEvent.next();
    }
}