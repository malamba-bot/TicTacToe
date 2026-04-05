import {Initialize} from './scenes/Initialize.js'
import {Play} from './scenes/Play.js'

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    physics: { 
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Initialize, Play],
}

export let game = new Phaser.Game(config);

export const globals = {
    width: game.config.width,
    height: game.config.height,
    grid_size: 4,
}

export const types = {
    cross: 0, circle: 1, triangle: 2, empty: 3,
}

