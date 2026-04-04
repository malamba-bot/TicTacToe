import {globals} from '../main.js'
import {types} from '../main.js'
import {Tile} from '../prefabs/Tile.js'

export class Play extends Phaser.Scene {

    preload() {
        this.load.setPath('./assets');
        
        this.load.image('empty', 'empty.png');
        this.load.image('circle', 'circle.png');
        this.load.image('cross', 'cross.png');
        this.load.image('triangle', 'triangle.png');
    }

    create() {
        this.num_moves = 0;
        this.board_matrix = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]

        // Initialize player
        this.player = types.cross;

        // Fill play area with empty tiles
        let size = globals.width / globals.grid_size;
        for (let i = 0; i < globals.grid_size; i++) {
            for (let j = 0; j < globals.grid_size; j++) {
                let tile = new Tile(this, i * size, j * size, 'empty');
                tile.setInteractive({useHandCursor: true});
                tile.on('pointerdown', () => {
                    tile.flip_tile(this.player);
                    this.switch_player();
                })
            }
        }
    }


    switch_player() {
        if (++this.num_moves > 1) {
            this.num_moves = 0;
            this.player = (this.player + 1) % 3;
        }
    }

}
