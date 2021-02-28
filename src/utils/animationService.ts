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
      key: "stop",
      frames: [{ key: "playerTank", frame: 0 }],
      frameRate: 1,
      repeat: 0,
      hideOnComplete: true
    });
  }
}
