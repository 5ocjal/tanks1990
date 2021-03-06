import { PlayerState } from '../models/enums/playerState';

export class GameState extends Phaser.Scene {
  playersGroup;
  bulletsGroup;
  enemiesGroup;

  constructor(key) {
    super(key);
  }

  create() {
    this.bulletsGroup = this.physics.add.group({ runChildUpdate: true });
    this.playersGroup = this.physics.add.group({ runChildUpdate: true });
    this.enemiesGroup = this.physics.add.group({ runChildUpdate: true });
    this.createColiders();
    console.log('gameState ready');
  }

  createColiders() {
    this.physics.add.collider(
      this.bulletsGroup,
      this.playersGroup,
      (bullet, player) => {
        this.destroyBullet(bullet);
        this.destroyPlayer(player);
      }
    );
  }

  destroyBullet(bullet) {
    bullet.play('hit');
    this.bulletsGroup.remove(bullet, true, true);
  }

  destroyPlayer(player) {
    if (player.hasArmor > 0) {
      player.hasArmor--;
    } else {
      player.life--;
    }

    if (player.life === 0) {
      player.state = PlayerState.isDestroyed;
      player.playerMonitor();
      player.play('hit');
      player.on('animationcomplete', () => {
        this.playersGroup.remove(player, true, true);
      });
    }
  }
}
