import 'phaser';

import { adventurerStates } from '../entities/adventurer/states';
import { adventurerTestPrefab } from '../entities/adventurer/test-prefab';
import { BaseScene } from './base-scene';

export class HitboxTestScene extends BaseScene {
  constructor() {
    super({ key: 'hitboxTest' })
  }

  create(data: any) {
    super.create(data);

    this.entityManager.registerPrefab('test-adventurer', adventurerTestPrefab);
    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
    ]);

    const adventurer = this.entityManager.createPrefab('test-adventurer', {}, 5, 0, 0, 0) as Entities.Adventurer;

    let frameIndex = 8;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    adventurer.sprite.x = 150;
    adventurer.sprite.y = 200;
    adventurer.sprite.setTexture('adventurer-bow');
    adventurer.sprite.setFrame(frameIndex);
    adventurer.body.allowGravity = false;

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      adventurer.sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });
  }
}
