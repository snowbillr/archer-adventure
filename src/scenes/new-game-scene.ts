import { BaseScene } from "./base-scene";

import { SCENE_KEYS } from "../constants/scene-keys";

export class NewGameScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.newGame });
  }

  create() {
    this.persistence.adventurer.maxHealth = 5;
    this.persistence.adventurer.health = 5;

    this.persistence.location.areaKey = 'woollards-farm';
    this.persistence.location.markerName = 'adventurerStart';

    this.persistence.save();

    this.scene.start(SCENE_KEYS.continueGame);
  }
}
