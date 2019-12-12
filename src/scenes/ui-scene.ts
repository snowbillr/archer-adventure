import { BaseScene } from './base-scene';

const healthbarFrameMap: { [key: number]: number} = {
  5: 0,
  4: 1,
  3: 2,
  2: 3,
  1: 4,
};

export abstract class UiScene extends BaseScene {
  constructor() {
    super({key: 'ui'});
  }

  create() {
    const healthbar = this.add.sprite(80, 25, 'healthbar', 0);

    this.persistence.onChange<number>('adventurer.health', health => {
      healthbar.setFrame(healthbarFrameMap[health]);
    });
  }
}
