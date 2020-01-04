import { BaseScene } from './base-scene';
import { SCENE_KEYS } from '../constants/scene-keys';

const healthbarFrameMap: { [key: number]: number} = {
  5: 0,
  4: 1,
  3: 2,
  2: 3,
  1: 4,
};

export class HUDScene extends BaseScene {
  private healthListenerCleanupFn?: () => void;

  constructor() {
    super({ key: SCENE_KEYS.hud });
  }

  init() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());
  }

  create() {
    const healthbar = this.add.sprite(80, 25, 'healthbar', 0);

    this.healthListenerCleanupFn = this.persistence.adventurer.onChange<number>('health', health => {
      healthbar.setFrame(healthbarFrameMap[health]);
    });
  }

  shutdown() {
    if (this.healthListenerCleanupFn) {
      this.healthListenerCleanupFn();
    }
  }
}
