import {globals} from '../main.js'
import {types} from '../main.js'
import {Tile} from '../prefabs/Tile.js'

export class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }

    create() {
        this.num_moves = 0;
        this.replaced = false;

        this.board_matrix = [
            [types.empty, types.empty, types.empty, types.empty],
            [types.empty, types.empty, types.empty, types.empty],
            [types.empty, types.empty, types.empty, types.empty],
            [types.empty, types.empty, types.empty, types.empty],
        ]
        
        // Initialize player
        this.player = types.cross;

        // Fill play area with empty tiles
        let size = globals.width / globals.grid_size;
        for (let i = 0; i < globals.grid_size; i++) {
            for (let j = 0; j < globals.grid_size; j++) {
                this.create_tile(i, j, size);
            }
        }
    }


    switch_player() {
        if (++this.num_moves > 1) {
            this.num_moves = 0;
            this.player = (this.player + 1) % 3;
            this.replaced = false;
        }
    }

    create_tile(i, j, size) {
        let tile = new Tile(this, i * size, j * size, 'empty');
        tile.setInteractive({useHandCursor: true});
        // Add listener that only flips up to one non-empty tile per turn
        tile.on('pointerdown', () => {
            if (tile.type == types.empty) {
                tile.flip_tile(this.player);
            } else if (tile.type != this.player && this.replaced == false) {
                tile.flip_tile(this.player);
                this.replaced = true;
            }
        })
    }

}
