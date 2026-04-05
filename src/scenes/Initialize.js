export class Initialize extends Phaser.Scene {

    constructor(queryMode) {
        super('initializeScene');
        this.queryMode = queryMode ?? 'mainMenuScene';
    }

    preload() {
        this.load.setPath('./assets');

        this.load.image('empty', 'empty.png');
        this.load.image('circle', 'circle.png');
        this.load.image('cross', 'cross.png');
        this.load.image('triangle', 'triangle.png');
    }

    create() {
        this.scene.start(this.queryMode);
    }

}
