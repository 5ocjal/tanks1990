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
    this.createColliders();
    console.log('gameState ready');
  }

  createColliders() {
    this.physics.add.collider(
      this.bulletsGroup,
      this.bulletsGroup,
      (b1, b2) => {
        this.destroyBullet([b1, b2]);
      }
    );

    this.physics.add.collider(
      this.bulletsGroup,
      this.playersGroup,
      (bullet, player) => {
        this.destroyBullet([bullet]);
        this.destroyPlayer(player);
      }
    );

    this.physics.add.collider(this.playersGroup, this.bricksGroup);

    this.physics.add.overlap(
      this.bulletsGroup,
      this.bricksGroup,
      (bullet, brick) => {
        this.destroyBullet([bullet]);
        this.destroyBrick(bullet, brick);
      }
    );
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

  destroyBrick(bullet, brick) {
    bullet.play('scratch');
    
    if (bullet.body.touching.right && brick.body.touching.left) {
      brick.setCrop(0, 0, brick.body.width - 4, brick.body.height);
      brick.setSize(brick.body.width - 4, brick.body.height);
      brick.body.offset.x -= 4;
      brick.setX(brick.x + 4);
      brick.durableX--;
    }

    if (bullet.body.touching.left && brick.body.touching.right) {
      brick.setCrop(0, 0, brick.body.width - 4, brick.body.height);
      brick.setSize(brick.body.width - 4, brick.body.height);
      brick.body.offset.x -= 4;
      brick.durableX--;
    }

    if (bullet.body.touching.down && brick.body.touching.up) {
      brick.setCrop(0, 0, brick.body.width, brick.body.height - 4);
      brick.setSize(brick.body.width, brick.body.height - 4);
      brick.body.offset.y -= 4;
      brick.setY(brick.y + 4);
      brick.durableY--;
    }

    if (bullet.body.touching.up && brick.body.touching.down) {
      brick.setCrop(0, 0, brick.body.width, brick.body.height - 4);
      brick.setSize(brick.body.width, brick.body.height - 4, true);
      brick.body.offset.y -= 4;
      brick.durableY--;
    }

    if (brick.durableX === 0 || brick.durableY === 0) {
      brick.play('hit');
      brick.once('animationcomplete', () => {
        this.bricksGroup.remove(brick, true, true);
      });
    }
  }
}
