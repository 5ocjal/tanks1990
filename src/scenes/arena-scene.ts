import { Player } from './../models/player.model';
import { AnimationService } from '../utils/animationService';
import { AssetsLoader } from '../models/assetsLoader/assetsLoader';

export class ArenaScene extends Phaser.Scene {
  animationService = new AnimationService();
  assetsLoader = new AssetsLoader();
  playerInfo;
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
    this.bulletsGroup = this.physics.add.group({ runChildUpdate: true });
    this.player = new Player({
      scene: this,
      x: 100,
      y: 90,
      texture: 'playerTank',
      name: 'player1',
    });
    this.playerInfo = this.player.life;

    this.physics.add.collider(this.bulletsGroup, this.player, (i1, i2) => {
      if (this.player.hasArmor > 0) {
        console.log('a');
        this.player.hasArmor--;
      } else {
        console.log('b');
        this.player.life--;
        this.playerInfo.setText(`${'Player: ' + this.player.life.toString()}`);

        if (this.player.life === 0) {
          this.player.stop();
          this.anims.play('hit', i1);
          i1.destroy();
        }
  }

      i2.destroy();
    });

    this.playerInfo = this.add.text(16, 16, `${'Player: ' + this.playerInfo}`, {
      fontSize: '12px',
    });

  }

  update() {
    this.player ? this.player.playerControl() : this.gameOver();
  }

  gameOver() {
    console.log('Game Over');
  }
}
