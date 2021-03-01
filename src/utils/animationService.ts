export class AnimationService {
  createAnimation(scene) {
    scene.anims.create({
      key: "move",
      frames: scene.anims.generateFrameNumbers("playerTank", {
        start: 1,
        end: 2
      }),
      frameRate: 10,
      repeat: -1,
      hideOnComplete: true
    });

    scene.anims.create({
      key: "hit",
      frames: scene.anims.generateFrameNumbers("bulletHit", {
        start: 0,
        end: 2
      }),
      frameRate: 20,
      hideOnComplete: true
    });
  }
}
