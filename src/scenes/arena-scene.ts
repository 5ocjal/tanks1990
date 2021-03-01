import { Player } from "./../models/player.model";
import { AnimationService } from "../utils/animationService";
import { Collection } from "../models/collections.model";
import { Speed } from "../models/enums/speed.enum";
import { AssetsLoader } from "../models/assetsLoader/assetsLoader";

export class ArenaScene extends Phaser.Scene {
  animationService = new AnimationService();
  assetsLoader = new AssetsLoader();
  player;
  bullet;
  bulletsGroup;
  frameSize = {
    frameWidth: 16,
    frameHeight: 16
  };

  constructor() {
    super({
      key: "ArenaScene"
    });
  }

  init() {}

  preload() {
    this.assetsLoader.loadSprites(this);
    this.assetsLoader.loadAudio(this);
  }

  create() {
    this.animationService.createAnimation(this);
    this.bulletsGroup = this.physics.add.staticGroup();
    this.player = new Player({scene: this, x: 200, y: 200, texture: 'playerTank', name: 'player1'})
  }

  update() {
   this.player ? this.player.playerControl() : this.gameOver();
  }

  createBullet(owner) {
    console.log("Fire!", this);
    this.bullet = this.physics.add.sprite(owner.x, owner.y, "bullet");
    this.bullet.name = owner.name;
    this.bullet.setCollideWorldBounds(true, 1, 1);
    this.bullet.setScale(0.4);
    this.bulletsGroup.add(this.bullet);

    switch (owner.angle) {
      case 0:
        this.bullet.setPosition(this.bullet.x, this.bullet.y - 20);
        this.bullet.setVelocityY(-Speed.BULLET);
        break;

      case -180:
        this.bullet.setPosition(this.bullet.x, this.bullet.y + 20);
        this.bullet.setVelocityY(Speed.BULLET);
        break;

      case 90:
        this.bullet.setPosition(this.bullet.x + 20, this.bullet.y);
        this.bullet.setVelocityX(Speed.BULLET);
        break;

      case -90:
        this.bullet.setPosition(this.bullet.x - 20, this.bullet.y);
        this.bullet.setVelocityX(-Speed.BULLET);
        break;
    }

    this.physics.add.collider(this.bullet, this.player, () => {
      this.bulletCollision(this.bullet);
    });
  }

  bulletCollision(bullet) {
    console.log("boom", bullet.name);
    bullet.play("hit");
    bullet.destroy();
    this.player.play("hit");
  }

  gameOver() {
    console.log("Game Over");
  }
}
