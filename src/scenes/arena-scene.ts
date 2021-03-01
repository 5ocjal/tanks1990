import { Player } from './../models/player.model';
import { AnimationService } from '../utils/animationService';
import { AssetsLoader } from '../models/assetsLoader/assetsLoader';

export class ArenaScene extends Phaser.Scene {
  animationService = new AnimationService();
  assetsLoader = new AssetsLoader();
  player;
  bulletsGroup;
  frameSize = {
    frameWidth: 16,
    frameHeight: 16,
  };

  constructor() {
    super({
      key: 'ArenaScene',
    });
  }

  preload() {
    this.assetsLoader.loadSprites(this);
    this.assetsLoader.loadAudio(this);
  }

  create() {
    this.animationService.createAnimation(this);
    this.bulletsGroup = this.physics.add.staticGroup();
    this.player = new Player({
      scene: this,
      x: 200,
      y: 200,
      texture: 'playerTank',
      name: 'player1',
    });
  }

  update() {
    this.player ? this.player.playerControl() : this.gameOver();
  }

  gameOver() {
    console.log('Game Over');
  }
}
