import { Player } from './../models/player.model';
import { AnimationService } from '../utils/animationService';
import { AssetsLoader } from '../models/assetsLoader/assetsLoader';
import { GameState } from '../state/gameState';
import { Brick } from '../models/brick.model';

export class ArenaScene extends GameState {
  gameState;
  animationService;
  assetsLoader;
  spawnPoint;
  playerInfo;
  player;
  brick;

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

    this.spawnPoint = this.physics.add.sprite(70, 12, 'spawn', 0);
    this.spawnPoint.play('spawn');
    this.spawnPoint.once('animationcomplete', () => {
    this.newPlayer();
    });

    for (let index = 0; index < 4; index++) {
      this.brick = new Brick({ scene: this, x: 40*(index), y: 90 });
    }

  }

  update() {
    setTimeout(() => {
      this.player.active ? this.player.playerControl() : this.gameOver();
      this.playerInfo.setText(`${'Player: ' + this.player.life.toString()}`);
    }, 3000);
  }

  newPlayer(){
    this.player = new Player({
      scene: this,
      x: this.spawnPoint.x,
      y: this.spawnPoint.y,
      name: 'player1',
    });
    this.playerInfo = this.player.life;
    this.playerInfo = this.add.text(8,8, `${'Player: ' + this.playerInfo}`, {
      fontSize: '10px',
    });
  }

  gameOver() {
    console.log('Game Over');
  }
}
