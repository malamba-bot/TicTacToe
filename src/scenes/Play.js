// http://127.0.0.1:5500/?mode=playScene

import {globals} from '../main.js'
import {types} from '../main.js'
import {Tile} from '../prefabs/Tile.js'

export class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }

    create() {
        this.total_placed = 0;
        this.total_replaced = 0;

        this.player_moves = 0;
        this.replaced = false;

        this.board_matrix = [
            [types.empty, types.empty, types.empty, types.empty],
            [types.empty, types.empty, types.empty, types.empty],
            [types.empty, types.empty, types.empty, types.empty],
            [types.empty, types.empty, types.empty, types.empty],
        ];

        // Initialize player
        this.player = types.cross;

        // Fill play area with empty tiles
        let size = globals.width / globals.grid_size;
        for (let i = 0; i < globals.grid_size; i++) {
            for (let j = 0; j < globals.grid_size; j++) {
                this.create_tile(i, j, size);
            }
        }

        this.create_player_text();
        this.create_timer();
    }

    switch_player() {
            this.player_moves = 0;
            this.player = this.next_player();
            this.replaced = false;
            this.player_image.setTexture(globals.texture_key[this.player]);
            this.player_next_image.setTexture(globals.texture_key[this.next_player()]);
    }

    next_player() {
        return (this.player + 1) % 3
    }

    create_tile(i, j, size) {
        let tile = new Tile(this, i * size, j * size, 'empty');
        tile.setInteractive();
    }

    create_timer() {
        this.play_timer = this.time.addEvent({
            delay: 60000,
            callback: this.reset_timer,
            callbackScope: this,
            loop: false
        });

        this.timer_text = this.add.text(
            globals.width - globals.padding,
            globals.board_height + globals.padding * 5, 
            `Turn timer: ${this.play_timer.getRepeatCount()}`,
            {
                fontSize: 48
            }
        ).setOrigin(1, 0);

    }

    create_player_text() {
        let playing_text = this.add.text(
            globals.padding,
            globals.board_height + globals.padding * 5, 
            'Playing -  ',
            {
                fontSize: 48,
            }
        ).setOrigin(0);

        let playing_next_text = this.add.text(
            globals.padding,
            playing_text.y + playing_text.height+ globals.padding * 5, 
            'Next up -  ',
            {
                fontSize: 48,
            }
        ).setOrigin(0);

        this.player_image = this.add.image(
            playing_text.x + playing_text.width,
            playing_text.y + playing_text.height / 2,
            globals.texture_key[this.player],
        ).setOrigin(0.5);

        this.player_next_image = this.add.image(
            playing_next_text.x + playing_next_text.width,
            playing_next_text.y + playing_next_text.height / 2,
            globals.texture_key[this.next_player()],
        ).setOrigin(0.5);
    }

    reset_timer() {
        this.switch_player();
        this.play_timer.reset({
            delay: 60000,
            callback: this.reset_timer,
            callbackScope: this,
            loop: false
        });
    }

    update() {
    this.timer_text.setText(`Time - ${Math.ceil(this.play_timer.getRemainingSeconds())}`);
    }

}
