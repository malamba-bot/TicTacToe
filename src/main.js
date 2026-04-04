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
    scene: [Play],
}

export let game = new Phaser.Game(config);

export const globals = {
    width: game.config.width,
    height: game.config.height,
    grid_size: 4,
}

export const types = {
    empty: 0, cross: 1, circle: 2, triangle: 3,
}

