import { AnimationService } from '../utils/animationService';
import { Bullet } from './bullet.model';
import { Speed } from './enums/speed.enum';

export class Player extends Phaser.Physics.Arcade.Sprite {
  animationService = new AnimationService();
  inputCursor;
  isMoving = false;
  config;
  sounds = {
    idle: null,
    move: null,
  };

  constructor(config) {
    super(config.scene, config.x, config.y, 'playerTank');
    config.scene.sys.arcadePhysics.world.enableBody(this, 0);
    this.config = config;
    this.setCollideWorldBounds(true);
    this.setScale(2);
    this.setAngle(0);
    this.setName(config.name);
    this.setVelocityX(1.0);
    this.setActive(true);

    this.inputCursor = config.scene.input.keyboard.createCursorKeys();
    config.scene.add.existing(this);
    this.create();
  }

  preload() {}
  create() {
    this.sounds.idle = this.config.scene.sound.add('idle', { volume: 0.3 });
    this.sounds.move = this.config.scene.sound.add('move', { volume: 0.3 });
  }
  update() {}
  destroy() {}

  playerControl() {
    if (this.inputCursor.up.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityY(-Speed.PLAYER);
      this.setAngle(0);
      this.play('move');
    } else if (this.inputCursor.down.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityY(Speed.PLAYER);
      this.setAngle(180);
      this.play('move');
    } else if (this.inputCursor.left.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityX(-Speed.PLAYER);
      this.setAngle(270);
      this.play('move');
    } else if (this.inputCursor.right.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityX(Speed.PLAYER);
      this.setAngle(90);
      this.play('move');
    } else {
      this.isMoving = false;
      this.setVelocity(0);
      this.anims.stop();
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputCursor.space)) {
      new Bullet(this.config, this);
    }

    if (this.isMoving) {
      //this.sounds.idle.stop();
      this.sounds.move.play();
    } else {
      this.sounds.move.stop();
      //this.sounds.idle.play();
    }
  }
}
