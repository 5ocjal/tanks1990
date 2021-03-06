import { GameState } from './../state/gameState';
import { Speed } from './enums/speed.enum';

export class Bullet extends Phaser.Physics.Arcade.Sprite {

  constructor(config, owner) {
    super(config.scene, owner.x, owner.y, 'bullet');
    this.scene.physics.world.enable(this);
    this.setName(owner.name);
    this.setCollideWorldBounds(true, 1, 1);
    this.setScale(0.4);
    this.setBounce(0);
    config.scene.add.existing(this);
    config.scene.bulletsGroup.children.set(this);
    this.setBulletMove(this, owner);
  }

  private setBulletMove(bullet, owner) {
    switch (owner.angle) {
      case 0:
        bullet.setPosition(bullet.x, bullet.y - 20);
        bullet.setVelocityY(-Speed.BULLET);
        break;
      case -180:
        bullet.setPosition(bullet.x, bullet.y + 20);
        bullet.setVelocityY(Speed.BULLET);
        break;
      case 90:
        bullet.setPosition(bullet.x + 20, bullet.y);
        bullet.setVelocityX(Speed.BULLET);
        break;
      case -90:
        bullet.setPosition(bullet.x - 20, bullet.y);
        bullet.setVelocityX(-Speed.BULLET);
        break;
    }
  }

  bulletCollision(bullet) {}
}
