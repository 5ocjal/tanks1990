import { AnimationService } from "../utils/animationService";

export class ArenaScene extends Phaser.Scene {
  animationService = new AnimationService();
  player;
  playerMove;

  constructor() {
    super({
      key: "ArenaScene"
    });
  }

  init() {}

  preload() {
    this.load.spritesheet("playerTank", "../../assets/playerTank.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.player = this.physics.add
      .sprite(100, 100, "playerTank")
      .setCollideWorldBounds(true)
      .setScale(2, 2)
      .setAngle(0);
    this.playerMove = this.input.keyboard.createCursorKeys();
    this.animationService.createAnimation(this);
  }

  update() {
    if (this.playerMove.up.isDown) {
      this.player.setVelocityY(-80);
      this.player.setAngle(0);
      this.player.play("move");
    } else if (this.playerMove.down.isDown) {
      this.player.setVelocityY(80);
      this.player.setAngle(180);
      this.player.play("move");
    } else if (this.playerMove.left.isDown) {
      this.player.setVelocityX(-80);
      this.player.setAngle(270);
      this.player.play("move");
    } else if (this.playerMove.right.isDown) {
      this.player.setVelocityX(80);
      this.player.setAngle(90);
      this.player.play("move");
    } else {
      this.player.setVelocity(0);
      this.player.play("stop");
    }
  }
}
