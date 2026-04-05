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
        this.scene.board_matrix[this.y_pos][this.x_pos] = type;
        console.log(this.check_win_condition());
        this.scene.switch_player();
    }

    /*
        * Walks through the row and column on this tile and checks if they
        * all tiles are of this type.
        */
    check_win_condition() {
        let uniform = true;

        // Check row
        for (let i = 0; i < globals.grid_size; i++) {
            if (this.scene.board_matrix[i][this.x_pos] != this.type) {
               uniform = false; 
            } 
        }

        if (uniform) return true;

        // Check col
        for (let i = 0; i < globals.grid_size; i++) {
            if (this.scene.board_matrix[this.y_pos][i] != this.type) {
                return false;
            }
        }
        return true;
    }
    
}
