import {globals} from '../main.js'

export class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenuScene');
    }

    create() {
        this.createButton('Local Multiplayer', globals.width * 0.5, globals.board_height * 0.45, {}, this.startLocalGame);

        // FIXME write multiplayer adapter into data param
        this.createButton('Remote Multiplayer (Not yet implemented)', globals.width * 0.5, globals.board_height * 0.55, {}, this.startRemoteGame);
    }

    startLocalGame() {
        this.scene.start('playScene', {});
    }

    startRemoteGame() {
        this.scene.start('playScene', {});
    }

}
