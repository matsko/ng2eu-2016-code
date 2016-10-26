import {Component, trigger, transition, style, keyframes, animate, state} from '@angular/core';

@Component({
    selector: 'installer-cmp',
    templateUrl: 'demo_7/installer_cmp.html',
    styleUrls: ['./demo_7/installer_cmp.css'],
    animations: [
        trigger('loading', [
            state('start', style({ left: '0%'})),
            state('end', style({ left: 'calc(100% - 100px)'})),
            transition('start => end', [
                animate(2000, keyframes([
                    style({ left: '0', transform: 'rotate(0deg)', offset: 0 }),
                    style({ left: '40%', transform: 'rotate(250deg) translateY(-200px)', offset: .33 }),
                    style({ left: '60%', transform: 'rotate(180deg) translateY(200px)', offset: .66 }),
                    style({ left: 'calc(100% - 100px)', transform: 'rotate(0deg)', offset: 1 }),
                ]))
            ])
        ])       
    ]
})
export class InstallerCmp {
    playValue = 'start';
    player = null;

    get isPlaying() {
        return !!this.player;
    }

    play() {
        if (this.player) {
            this.player.play();
        } else if (this.playValue == 'end') {
            this.playValue = 'start';
        } else {
            this.playValue = 'end';
        }
    }

    setPosition(value) {
        if (this.player) {
            this.player.pause();
            this.player.setPosition(value / 100);
        }
    }

    registerPlayer(player: any) {
        this.player = player;
    }

    deregisterPlayer() {
        this.player = null;
    }
}
