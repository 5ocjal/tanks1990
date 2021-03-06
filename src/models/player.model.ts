import { AnimationService } from '../utils/animationService';
import { Bullet } from './bullet.model';
import { PlayerState } from './enums/playerState';
import { Speed } from './enums/speed.enum';

export class Player extends Phaser.Physics.Arcade.Sprite {
  config;
  animationService = new AnimationService();
  inputCursor;

  name = null;
  state = PlayerState.isIdle;
  life = 3;
  score = 0;
  hasTurbo = 0;
  hasArmor = 0;
  hasCollection = 0;
  isPlayer = true;

  sounds = {
    idle: null,
    move: null,
  };

  constructor(config) {
    super(config.scene, config.x, config.y, 'playerTank');
    this.config = config;
    this.scene.physics.world.enable(this);
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

  create() {
    this.config.scene.playersGroup.children.set(this);
    this.sounds.idle = this.config.scene.sound.add('idle', { volume: 0.3 });
    this.sounds.move = this.config.scene.sound.add('move', { volume: 0.3 });
  }

  playerControl() {
    let oldState = this.state;

    if (this.inputCursor.up.isDown) {
      if (this.state === PlayerState.isMoving) return;
      this.state = PlayerState.isMoving;
      this.setVelocityY(-Speed.PLAYER);
      this.setAngle(0);
    } else if (this.inputCursor.down.isDown) {
      if (this.state === PlayerState.isMoving) return;
      this.state = PlayerState.isMoving;
      this.setVelocityY(Speed.PLAYER);
      this.setAngle(180);
    } else if (this.inputCursor.left.isDown) {
      if (this.state === PlayerState.isMoving) return;
      this.state = PlayerState.isMoving;
      this.setVelocityX(-Speed.PLAYER);
      this.setAngle(270);
    } else if (this.inputCursor.right.isDown) {
      if (this.state === PlayerState.isMoving) return;
      this.state = PlayerState.isMoving;
      this.setVelocityX(Speed.PLAYER);
      this.setAngle(90);
    } else {
      this.state = PlayerState.isIdle;
      this.setVelocity(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputCursor.space)) {
      new Bullet(this.config, this);
    }

    if (oldState !== this.state && oldState !== PlayerState.isDestroyed) {
      this.playerMonitor();
    }
  }

  playerMonitor() {

    switch (this.state) {
      case PlayerState.isIdle:
        this.play('idle');
        this.sounds.move.stop();
        this.sounds.idle.play();
        break;
      case PlayerState.isMoving:
        this.play('move');
        this.sounds.idle.stop();
        this.sounds.move.play();
        break;
      case PlayerState.isDestroyed:
        this.sounds.idle.stop();
        this.sounds.move.stop();
        break;

      default:
        break;
    }
  }
}
