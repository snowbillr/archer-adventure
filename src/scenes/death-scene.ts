import { SCENE_KEYS } from '../constants/scene-keys';
import { BaseScene } from './base-scene';

export class DeathScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.death });
  }

  create() {
    const titleText = this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY - 24, 'compass-72', 'You died');
    titleText.setOrigin(0.5);

    const promptText = this.add.bitmapText(this.cameras.main.centerX, this.cameras.main.centerY + 32, 'compass-24', 'Try again?');
    promptText.setOrigin(0.5);

    this.input.keyboard.once(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress === 1) {
          this.scene.stop(SCENE_KEYS.exploration);
          this.scene.stop(SCENE_KEYS.hud);
          this.scene.stop(SCENE_KEYS.death);

          this.scene.start(SCENE_KEYS.continueGame);
        }
      });
    });
  }
}