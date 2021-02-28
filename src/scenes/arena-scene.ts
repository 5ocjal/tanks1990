import { AnimationService } from "../utils/animationService";

export class ArenaScene extends Phaser.Scene {
  animationService = new AnimationService();
  player;

  speed = {
    player: 30,
    enemy: 30,
    bullet: 100
  };
  playerMoving = false;
  bulletsGroup;
  inputCursor;

  constructor() {
    super({
      key: "ArenaScene"
    });
  }

  init() {}

  preload() {
    this.load.image("bullet", "../../assets/bullet.png");
    this.load.spritesheet("playerTank", "../../assets/playerTank.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.player = this.physics.add
      .sprite(100, 100, "playerTank")
      .setCollideWorldBounds(true)
      .setScale(2)
      .setAngle(0)
      .setName("player1");
    this.inputCursor = this.input.keyboard.createCursorKeys();
    this.animationService.createAnimation(this);
    this.bulletsGroup = this.physics.add.group();
  }

  update() {
    this.playerControl();
  }

  createBullet(owner) {
    console.log("Fire!", this.player);
    let bullet = this.physics.add.sprite(owner.x, owner.y, "bullet");
    bullet.name = owner.name;
    bullet.setScale(0.3);
    this.bulletsGroup.add(bullet);

    switch (owner.angle) {
      case 0:
        bullet.setPosition(bullet.x, bullet.y - 16);
        bullet.setVelocityY(-this.speed.bullet);
        break;

      case -180:
        bullet.setPosition(bullet.x, bullet.y + 16);
        bullet.setVelocityY(this.speed.bullet);
        break;

      case 90:
        bullet.setPosition(bullet.x + 16, bullet.y);
        bullet.setVelocityX(this.speed.bullet);
        break;

      case -90:
        bullet.setPosition(bullet.x - 16, bullet.y);
        bullet.setVelocityX(-this.speed.bullet);
        break;
    }
  }

  playerControl() {
    if (this.inputCursor.up.isDown) {
      if (this.playerMoving) return;
      this.playerMoving = true;
      this.player.setVelocityY(-this.speed.player);
      this.player.setFlip = true;
      this.player.setAngle(0);
      this.player.play("move");
    } else if (this.inputCursor.down.isDown) {
      if (this.playerMoving) return;
      this.playerMoving = true;
      this.player.setVelocityY(this.speed.player);
      this.player.setFlip = false;
      this.player.setAngle(180);
      this.player.play("move");
    } else if (this.inputCursor.left.isDown) {
      if (this.playerMoving) return;
      this.playerMoving = true;
      this.player.setVelocityX(-this.speed.player);
      this.player.setAngle(270);
      this.player.play("move");
    } else if (this.inputCursor.right.isDown) {
      if (this.playerMoving) return;
      this.playerMoving = true;
      this.player.setVelocityX(this.speed.player);
      this.player.setAngle(90);
      this.player.play("move");
    } else {
      this.playerMoving = false;
      this.player.setVelocity(0);
      this.player.play("stop");
    }

    if (Phaser.Input.Keyboard.JustDown(this.inputCursor.space)) {
      this.createBullet(this.player);
    }
  }
}
