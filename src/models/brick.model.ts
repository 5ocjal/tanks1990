export class Brick extends Phaser.Physics.Arcade.Sprite {
    constructor(config){
        super(config.scene, config.x, config.y, 'brick')
    }
}