export class Brick extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'brick');
    
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.setScale(2);
    this.setActive(true);
    this.setImmovable(true);
    config.scene.add.existing(this);
    config.scene.bricksGroup.children.set(this);
  }
}
