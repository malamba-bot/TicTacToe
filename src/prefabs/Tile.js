import {globals} from '../main.js'
import {types} from '../main.js'

export class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.type = types.empty;

        let tile_res = {
            x: globals.width / globals.grid_size,
            y: globals.board_height / globals.grid_size 
        }
        this.x_pos = x / tile_res.x;
        this.y_pos = y / tile_res.y; 

        this.ns_diag = this.x_pos == this.y_pos;
        this.sn_diag = (globals.grid_size - 1 - this.y_pos) == this.x_pos;

        this.setOrigin(0);

        this.tile = scene.add.rectangle(
            x + globals.padding,
            y + globals.padding,
            tile_res.x - globals.padding * 2,
            tile_res.y - globals.padding * 2, 
            null,
            0)
            .setOrigin(0).setRounded(4).setInteractive();
        this.tile.setStrokeStyle(globals.border, 0xFFFFFF)

        this.add_listeners();

        scene.add.existing(this);

    }

    flip_tile(type) {
        this.type = type;
        this.setTexture(globals.texture_key[type]);

        // Update the board matrix
        this.scene.board_matrix[this.y_pos][this.x_pos] = type;
        this.scene.total_placed++;
        this.scene.player_moves++;

        if (this.check_win_condition()) {
            console.log('won');
        } else if (this.check_board_full()) {
            console.log('the board is full');
        }

        if (this.player_moves > 1) {
            this.scene.switch_player();
        }
    }

    check_board_full() {
        return this.scene.replaced == true && 
            this.scene.total_placed - this.scene.total_replaced
            >= globals.grid_size * globals.grid_size;
    }

    /*
        * Walks through the row and column on this tile and checks if they
        * all tiles are of this type. If the tile is north-south or
        * south-north diagonal, these are also checked for uniformity.
        */
        check_win_condition() {
            let uniform = true;

            // Check row
            for (let i = 0; i < globals.grid_size; i++) {
                if (this.scene.board_matrix[this.y_pos][i] != this.type) {
                    uniform = false;
                    break;
                } 
            }
            if (uniform) return true;

            // Check row
            uniform = true;
            for (let i = 0; i < globals.grid_size; i++) {
                if (this.scene.board_matrix[i][this.x_pos] != this.type) {
                    uniform = false; 
                    break;
                } 
            }
            if (uniform) return true;

            if (this.ns_diag) {
                uniform = true;
                for (let i = 0; i < globals.grid_size; i++) {
                    if (this.scene.board_matrix[i][i] != this.type) {
                        return false;
                    }
                }
            }

            if (this.sn_diag) {
                uniform = true;
                for (let i = 0; i < globals.grid_size; i++) {
                    let row = globals.grid_size - 1 - i;
                    if (this.scene.board_matrix[row][i] != this.type) {
                        return false;
                    }
                }
            }
            return uniform;
        }

    add_listeners() {
        this
            .on('pointerover', () => { 
                this.tile.setStrokeStyle(globals.border, 
                    this.type == types.empty ||
                    this.scene.replaced == false &&
                    this.type != this.scene.player ?
                    globals.colors.green :
                    globals.colors.red
                );
            })
            .on('pointerout', () => { this.tile.setStrokeStyle(globals.border, 0xFFFFFF) })
            .on('pointerdown', () => {
                if (this.type == types.empty) {
                    this.flip_tile(this.scene.player);
                } else if (this.type != this.scene.player && this.scene.replaced == false) {
                    this.scene.replaced = true;
                    this.scene.total_replaced++;
                    this.flip_tile(this.scene.player);
                }
            })
    }
}
