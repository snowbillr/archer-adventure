import 'phaser';
import { BaseScene } from './base-scene';

import { adventurerStates } from '../entities/adventurer/states';
import { adventurerTestPrefab } from '../entities/adventurer/test-prefab';
import { arrowPrefab } from '../entities/arrow/prefab';
import { arrowStates } from '../entities/arrow/states';

export class BoundsTestScene extends BaseScene {
  constructor() {
    super({key: 'boundsTest'})
  }

  create(data: any) {
    super.create(data.any);

    this.entityManager.registerPrefab('test-adventurer', adventurerTestPrefab);
    this.entityManager.registerPrefab('arrow', arrowPrefab);

    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
      { id: 'arrow', states: arrowStates },
    ]);

    const arrow = this.entityManager.createPrefab('arrow', {}, 5, 0, 0, 0) as Entities.Adventurer;
    arrow.sprite.x = 400;
    arrow.sprite.y = 200;
    arrow.body.setVelocity(0, 0);
    arrow.body.allowGravity = false;

    let frameIndex = 8;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    // const adventurer = this.entityManager.createPrefab('test-adventurer', {}, 5, 0, 0, 0) as Entities.Adventurer;

    // adventurer.sprite.x = 150;
    // adventurer.sprite.y = 200;
    // adventurer.sprite.setTexture('adventurer-bow')
    // adventurer.sprite.setFrame(frameIndex);

    // adventurer.body.allowGravity = false;

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      // adventurer.sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });

    this.systemsManager.start();
  }
}
