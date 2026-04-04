import {globals} from '../main.js'
import {types} from '../main.js'

export class Tile extends Phaser.GameObjects.Sprite {

    static texture_key = ['cross', 'circle', 'triangle'];

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.type = types.empty;

        let tile_res = {
            x: globals.width / globals.grid_size,
            y: globals.height / globals.grid_size
        }
        this.x_pos = x / tile_res.x;
        this.y_pos = y / tile_res.y; 
        this.setDisplaySize(tile_res.x, tile_res.y);
        this.setOrigin(0);

        scene.add.existing(this);
    }

    flip_tile(type) {
        this.type = type;
        this.setTexture(Tile.texture_key[type]);
        
        // Update the board matrix
        //this.scene.board_matrix[
        console.log(this.x_pos, this.y_pos);
    }

    
}
