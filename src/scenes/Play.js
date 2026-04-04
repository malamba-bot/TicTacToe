import {globals} from '../main.js'
import {types} from '../main.js'
import {Tile} from '../prefabs/Tile.js'

export class Play extends Phaser.Scene {

    preload() {
        this.load.setPath('./assets');
        
        this.load.image('empty', 'empty.png');
    }

    create() {
        // Fill play area with empty tiles
        let size = globals.width / globals.grid_size;
        for (let i = 0; i < globals.grid_size; i++) {
            for (let j = 0; j < globals.grid_size; j++) {
                new Tile(this, i * size, j * size, 'empty');
            }
        }

    }
}
