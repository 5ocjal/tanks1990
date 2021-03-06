export class Brick extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, 'brick');

    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.setScale(2);
    this.setVelocityX(1.0);
    this.setActive(true);
  }
}
