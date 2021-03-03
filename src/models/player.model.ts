import { AnimationService } from '../utils/animationService';
import { Bullet } from './bullet.model';
import { Speed } from './enums/speed.enum';

export class Player extends Phaser.Physics.Arcade.Sprite {
  config;
  animationService = new AnimationService();
  inputCursor;

  name = null;
  life = 3;
  score = 0;
  hasTurbo = 0;
  hasArmor = 0;
  hasCollection = 0;
  isMoving = false;
  isPlayer = false;

  sounds = {
    idle: null,
    move: null,
  };

  constructor(config) {
    super(config.scene, config.x, config.y, 'playerTank');
    this.scene.physics.world.enable(this);
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
    } else if (this.inputCursor.down.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityY(Speed.PLAYER);
      this.setAngle(180);
    } else if (this.inputCursor.left.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityX(-Speed.PLAYER);
      this.setAngle(270);
    } else if (this.inputCursor.right.isDown) {
      if (this.isMoving) return;
      this.isMoving = true;
      this.setVelocityX(Speed.PLAYER);
      this.setAngle(90);
    } else {
      this.isMoving = false;
      this.setVelocity(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputCursor.space)) {
      new Bullet(this.config, this);
    }

    if (this.isMoving) {
      //this.sounds.idle.stop();
      this.play('move');
      this.sounds.move.play();
    } else {
      this.play('idle');
      this.sounds.move.stop();
      //this.sounds.idle.play();
    }
  }

  playerMonitor() {
    this.scene.events.off;
    this.destroy();
    this.setActive(false);
    console.log('destroy', this);
  }
}
