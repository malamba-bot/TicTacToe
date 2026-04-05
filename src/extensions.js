const buttonDefaults = {
    color: '#8d8d8d',
    colorHover: '#dfcdcd',
}

// Inspired by "Extension functions" from Kotlin; this file adds functions to object prototypes without modifying the prototype's original js code
//  Copied from https://github.com/Drullkus/tetromania/blob/main/src/extensions.js
Phaser.Scene.prototype.createButton = function createButton(text, posX, posY, textStyle, onDown) {
    const buttonTextObj = this.add.text(posX, posY, text, {
        backgroundColor: buttonDefaults.color,
        ...textStyle
    });

    buttonTextObj.setOrigin(0.5);
    buttonTextObj.setStroke('#000', 10);
    buttonTextObj.setInteractive();

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        buttonTextObj.setBackgroundColor(buttonDefaults.colorHover);
    });

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        buttonTextObj.setBackgroundColor(buttonDefaults.color);
    });

    buttonTextObj.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, onDown, this);

    return buttonTextObj;
};
