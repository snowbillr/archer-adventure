import { BaseScene } from "../scenes/base-scene";

function changeCameraTarget(scene: BaseScene, target: Phaser.GameObjects.Sprite) {
  return new Promise(resolve => {
    scene.cameras.main.stopFollow();
    scene.cameras.main.pan(target.x, target.y, 400, Phaser.Math.Easing.Quadratic.InOut, false, (camera, progress) => {
      if (progress === 1) {
        camera.startFollow(target);
        resolve();
      }
    });
  });
}

export function cameraFollowPrologue(scene: BaseScene, target: Phaser.GameObjects.Sprite) {
  return changeCameraTarget(scene, target);
}

export function cameraFollowEpilogue(scene: BaseScene, target: Phaser.GameObjects.Sprite) {
  return changeCameraTarget(scene, target);
}