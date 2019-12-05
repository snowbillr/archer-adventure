import 'phaser';
import { BaseScene } from './base-scene';

export abstract class UiScene extends BaseScene {
  constructor() {
    super({key: 'ui'});
  }

  create() {
    const healthbar = this.add.sprite(80, 25, 'healthbar', 0);
  }
}
