import { BaseScene } from "./base-scene";
import { SCENE_KEYS } from "../constants/scene-keys";

export class TitleScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.title });
  }

  create() {
    this.add.image(0, 0, 'title-screen').setOrigin(0, 0);
    this.add.image(0, 0, 'vignette-effect').setOrigin(0, 0).setAlpha(0.1);

    const titleText = this.add.bitmapText(400, 160, 'compass-72-title', 'Archer Adventure');
    titleText.setOrigin(0.5);
    titleText.alpha = 0;

    const startText = this.add.bitmapText(400, 250, 'compass-24', 'Start');
    startText.setOrigin(0.5);
    startText.alpha = 0;

    const optionsText = this.add.bitmapText(400, 290, 'compass-24', 'Options');
    optionsText.setOrigin(0.5);
    optionsText.alpha = 0;

    const indicator = this.add.sprite(350, 250, 'indicator-right');
    indicator.alpha = 0;
    indicator.anims.play('indicator-right');

    this.tweens.add({
      targets: [titleText, startText, indicator],
      props: {
        alpha: 1
      },
      duration: 1000,
    });
    this.tweens.add({
      targets: [optionsText],
      props: {
        alpha: 0.5
      },
      duration: 1000,
    });

    this.input.keyboard.on(Phaser.Input.Keyboard.Events.ANY_KEY_DOWN, () => {
      this.scene.stop();
      this.scene.start(SCENE_KEYS.exploration, { areaKey: 'woollards-farm' });
    });
  }
}