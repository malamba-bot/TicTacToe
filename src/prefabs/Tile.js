import {globals} from '../main.js'
import {types} from '../main.js'

export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.type = types.empty;

        // Create the tile
        this.tex = this.scene.add.rectangle(
            x, y,
            globals.width / globals.grid_size,
            globals.height / globals.grid_size,
            0xff00ff
        ).setOrigin(0);
        this.tex.setStrokeStyle(2);
        
    }

    
}
