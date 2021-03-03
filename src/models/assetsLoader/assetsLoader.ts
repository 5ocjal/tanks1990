export class AssetsLoader {
  loadSprites(scene) {
    scene.load.image('bullet', '../../assets/sprites/bullet.png');
    scene.load.spritesheet(
      'playerTank',
      '../../assets/sprites/playerTank.png',
      scene.frameSize
    );
    scene.load.spritesheet(
      'idleTank',
      '../../assets/sprites/idleTank.png',
      scene.frameSize
    );
    scene.load.spritesheet(
      'bulletHit',
      '../../assets/sprites/bulletHit.png',
      scene.frameSize
    );
    scene.load.spritesheet(
      'spawn',
      '../../assets/sprites/spawn.png',
      scene.frameSize
    );

    scene.load.spritesheet(
      'collection',
      '../../assets/sprites/collections.png',
      scene.frameSize
    );
  }

  loadAudio(scene) {
    scene.load.audio('idle', '../../assets/sounds/idle.wav');
    scene.load.audio('move', '../../assets/sounds/move.wav');
  }
}
