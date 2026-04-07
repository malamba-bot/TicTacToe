// http://127.0.0.1:5500/?mode=playScene

import {globals} from '../main.js'
import {types} from '../main.js'
import {Tile} from '../prefabs/Tile.js'
import {Button} from '../prefabs/Button.js'

export class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }

    create() {
        this.total_placed = 0;
        this.total_replaced = 0;

        this.player_moves = 0;
        this.replaced = false;
        this.game_over = false;

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
        this.reset_timer();
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
            delay: globals.turn_time,
            callback: this.switch_player,
            callbackScope: this,
            loop: false
        });

        this.timer_text = this.add.text(
            globals.width - globals.padding,
            globals.board_height + globals.padding * 5, 
            `Turn timer: ${this.play_timer.getRepeatCount()}`,
            globals.text_config
        ).setOrigin(1, 0);

    }

    create_player_text() {
        let playing_text = this.add.text(
            globals.padding,
            globals.board_height + globals.padding * 5, 
            'Playing -  ',
            globals.text_config
        ).setOrigin(0);

        let playing_next_text = this.add.text(
            globals.padding,
            playing_text.y + playing_text.height+ globals.padding * 5, 
            'Next up -  ',
            globals.text_config
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
        this.play_timer.reset({
            delay: globals.turn_time,
            callback: this.switch_player,
            callbackScope: this,
            loop: false
        });
    }


    end_game(winner) {
        let padding_config = 
            {
                padding:
                { 
                    x: globals.padding * 4,
                    y: globals.padding * 2,
                }
            };
        
        let button_config =
            {
                ...globals.text_config,
                ...padding_config
            }

        let text = this.add.text(
            globals.width / 2,
            globals.board_height / 2,
            winner,
            button_config
        )
            .setOrigin(0.5)
            .setDepth(1000);

        this.add.rectangle(
            text.x,
            text.y,
            text.width,
            text.height,
            null
        )
            .setDepth(text.depth - 1)
            .setRounded(globals.rounding)
            .setStrokeStyle(globals.border, 0xFFFFFF);

        new Button(
            this, 
            text.x,
            text.y + text.height + globals.padding * 2,
            'restart', 
            button_config,
            () => {this.scene.start('playScene')
        });

        this.game_over = true;
    }

    update() {
        if (!this.game_over) {
            this.timer_text.setText(`Time - ${Math.ceil(this.play_timer.getRemainingSeconds())}`);
        }
    }

}
