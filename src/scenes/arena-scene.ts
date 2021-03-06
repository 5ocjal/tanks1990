import { Player } from './../models/player.model';
import { AnimationService } from '../utils/animationService';
import { AssetsLoader } from '../models/assetsLoader/assetsLoader';
import { PlayerState } from '../models/enums/playerState';
import { GameState } from '../state/gameState';

export class ArenaScene extends GameState {
  gameState;
  animationService;
  assetsLoader;
  playerInfo;
  player;
  frameSize = {
    frameWidth: 16,
    frameHeight: 16,
  };

  constructor() {
    super({
      key: 'ArenaScene',
    });
    this.assetsLoader = new AssetsLoader();
    this.animationService = new AnimationService();
    this.gameState = new GameState('ArenaScene');
  }

  preload() {
    this.assetsLoader.loadSprites(this);
    this.assetsLoader.loadAudio(this);
  }

  create() {
    this.animationService.createAnimation(this);
    super.create();

    this.player = new Player({
      scene: this,
      x: 100,
      y: 90,
      texture: 'playerTank',
      name: 'player1',
    });
    this.playerInfo = this.player.life;
    this.playerInfo = this.add.text(16, 16, `${'Player: ' + this.playerInfo}`, {
      fontSize: '12px',
    });
  }

  update() {
    this.player.active ? this.player.playerControl() : this.gameOver();
    this.playerInfo.setText(`${'Player: ' + this.player.life.toString()}`);
  }

  gameOver() {
    console.log('Game Over');
  }
}
