import { BaseScene } from "../scenes/base-scene";
import { DepthManager } from "../lib/depth-manager";

const LETTERBOX_HEIGHT = 75;
const TWEEN_DURATION = 400;

let letterboxTop: Phaser.GameObjects.Rectangle;
let letterboxBottom: Phaser.GameObjects.Rectangle;

export function letterboxPrologue(scene: BaseScene) {
  return new Promise(resolve => {
    letterboxTop = scene.add.rectangle(0, -LETTERBOX_HEIGHT, scene.cameras.main.width, LETTERBOX_HEIGHT, 0x000000, 1)
      .setDepth(DepthManager.depthFor('notifications'))
      .setOrigin(0, 0)
      .setScrollFactor(0);

    letterboxBottom = scene.add.rectangle(0, scene.cameras.main.height, scene.cameras.main.width, LETTERBOX_HEIGHT, 0x000000, 1)
      .setDepth(DepthManager.depthFor('notifications'))
      .setOrigin(0, 0)
      .setScrollFactor(0);

    scene.tweens.timeline({
      duration: TWEEN_DURATION,
      onComplete: resolve,
      tweens: [
        {
          offset: 0,
          targets: scene.cameras.main,
          props: {
            zoom: 1.2
          },
        },
        {
          offset: 0,
          targets: letterboxTop,
          props: {
            y: `+=${LETTERBOX_HEIGHT}`
          },
        },
        {
          offset: 0,
          targets: letterboxBottom,
          props: {
            y: `-=${LETTERBOX_HEIGHT}`
          },
        }
      ]
    });
  });
}

export function letterboxEpilogue(scene: BaseScene) {
  return new Promise(resolve => {
    scene.tweens.timeline({
      duration: TWEEN_DURATION,
      onComplete: () => {
        letterboxTop.destroy();
        letterboxBottom.destroy();
        resolve();
      },
      tweens: [
        {
          offset: 0,
          targets: scene.cameras.main,
          props: {
            zoom: 1
          },
        },
        {
          offset: 0,
          targets: letterboxTop,
          props: {
            y: `-=${LETTERBOX_HEIGHT}`
          },
        },
        {
          offset: 0,
          targets: letterboxBottom,
          props: {
            y: `+=${LETTERBOX_HEIGHT}`
          },
        },
      ]
    });
  });
}