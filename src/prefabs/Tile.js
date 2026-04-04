import {globals} from '../main.js'
import {types} from '../main.js'

export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.type = types.empty;
        this.setDisplaySize(globals.width / 4, globals.height / 4);
        this.setOrigin(0);
        scene.add.existing(this);

    }

    
}
