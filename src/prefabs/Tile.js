import {globals} from '../main.js'
import {types} from '../main.js'

export class Tile extends Phaser.GameObjects.Sprite {

    static texture_key = ['cross', 'circle', 'triangle'];

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.type = types.empty;
        this.setDisplaySize(globals.width / 4, globals.height / 4);
        this.setOrigin(0);
        scene.add.existing(this);
    }

    flip_tile(type) {
        this.type = type;
        this.setTexture(Tile.texture_key[type]);
    }

    
}
