export class AnimationService {
  createAnimation(scene) {
    scene.anims.create({
      key: 'move',
      frames: scene.anims.generateFrameNumbers('playerTank', {
        start: 1,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: false,
    });

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('idleTank', {
        start: 1,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: false,
    });

    scene.anims.create({
      key: 'scratch',
      frames: [{ key: 'bulletHit', frame: 2 }],
      frameRate: 100,
    });

    scene.anims.create({
      key: 'hit',
      frames: scene.anims.generateFrameNumbers('bulletHit', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'spawn',
      frames: 'spawn',
      repeat: 3,
      frameRate: 10,
      hideOnComplete: true,
    });
  }
}
