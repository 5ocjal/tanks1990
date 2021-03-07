export class AssetsLoader {
  frameSize = {
    frameWidth: 16,
    frameHeight: 16,
  };

  loadSprites(scene) {
    scene.load.image('bullet', '../../assets/sprites/bullet.png');
    scene.load.spritesheet(
      'playerTank',
      '../../assets/sprites/playerTank.png',
      this.frameSize
    );
    scene.load.spritesheet(
      'idleTank',
      '../../assets/sprites/idleTank.png',
      this.frameSize
    );
    scene.load.spritesheet(
      'bulletHit',
      '../../assets/sprites/bulletHit.png',
      this.frameSize
    );
    scene.load.spritesheet(
      'spawn',
      '../../assets/sprites/spawn.png',
      this.frameSize
    );

    scene.load.spritesheet(
      'collection',
      '../../assets/sprites/collections.png',
      this.frameSize
    );

    scene.load.spritesheet(
      'brick',
      '../../assets/sprites/fullBrick.png',
      this.frameSize
    );
  }

  loadAudio(scene) {
    scene.load.audio('idle', '../../assets/sounds/idle.wav');
    scene.load.audio('move', '../../assets/sounds/move.wav');
    scene.load.audio('shot', '../../assets/sounds/shot.wav');
    scene.load.audio('brickHit', '../../assets/sounds/brickHit.wav' )
  }
}
