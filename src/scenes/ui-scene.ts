import 'phaser';
import { BaseScene } from './base-scene';
import { HealthComponent } from '../components/health-component';

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

    const explorationScene = this.scene.get('exploration') as BaseScene;
    const adventurer = explorationScene.phecs.phEntities.getEntitiesByTag('adventurer')[0];

    adventurer.components[HealthComponent.tag].onDamage((newHealth: number) => {
      healthbar.setFrame(healthbarFrameMap[newHealth]);
    });
  }
}
