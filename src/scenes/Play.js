import {globals} from '../main.js'

export class Play extends Phaser.Scene {
    create() {
        console.log(globals.width, globals.height);
    }
}
