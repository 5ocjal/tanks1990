export class Collection extends Phaser.GameObjects.Sprite {
    constructor(config){
        super(config.scene, config.x, config.y, config.texture);
    }
}