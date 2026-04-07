import {Initialize} from './scenes/Initialize.js'
import {MainMenu} from './scenes/MainMenu.js'
import {Play} from './scenes/Play.js'

const urlQueryParams = new URLSearchParams(window.location.search);

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 1000,
    backgroundColor: '#1F1F21',
    physics: { 
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [new Initialize(urlQueryParams.get('mode')), MainMenu, Play],
}

export let game = new Phaser.Game(config);

export const globals = {
    width: game.config.width,
    board_height: game.config.height - 200,
    grid_size: 4,
    padding: 6,
    border: 2,
    colors: {
        green: 0x4DAD48,
        red: 0xC11D1F,
    },
    texture_key: ['cross', 'circle', 'triangle'],
}

export const types = {
    cross: 0, circle: 1, triangle: 2, empty: 3,
}

