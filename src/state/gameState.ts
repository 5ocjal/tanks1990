import { Bullet } from '../models/bullet.model';
import { PlayerState } from '../models/enums/playerState';

export class GameState extends Phaser.Scene {
  playersGroup;
  bulletsGroup;
  enemiesGroup;
  bricksGroup;

  constructor(key) {
    super(key);
  }

  create() {
    this.bulletsGroup = this.physics.add.group({ runChildUpdate: true });
    this.playersGroup = this.physics.add.group({ runChildUpdate: true });
    this.enemiesGroup = this.physics.add.group({ runChildUpdate: true });
    this.bricksGroup = this.physics.add.group({ runChildUpdate: true });
    this.createColiders();
    console.log('gameState ready');
  }

  createColiders() {
    this.physics.add.collider(
      this.bulletsGroup,
      this.playersGroup,
      (bullet, player) => {
        this.destroyBullet([bullet]);
        this.destroyPlayer(player);
      },
      null,
      this
    );

    this.physics.add.collider(this.bulletsGroup, this.bulletsGroup, (b1, b2) => {
        this.destroyBullet([b1, b2]);
    } );
  }

  destroyBullet(bullet: any[]) {
    bullet.forEach((b) => {
      b.play('scratch', false);
      b.once('animationcomplete', () => {
        this.bulletsGroup.remove(b, true, true);
      });
    });
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
