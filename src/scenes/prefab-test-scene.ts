import 'phaser';
import { BaseScene } from './base-scene';

import { enemyPrefab } from '../entities/enemy/prefab';
import { enemyStates } from '../entities/enemy/states';

export class PrefabTestScene extends BaseScene {
  constructor() {
    super({key: 'prefabTest'})
  }

  create() {
    this.entityManager.registerPrefab('enemy', enemyPrefab);

    this.stateRegistrar.registerSets([
      { id: 'enemy', states: enemyStates },
    ]);

    let frameIndex = 0;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    const scale = 5;
    const enemy = this.entityManager.createPrefab('enemy', {}, scale, 0, 0, 0) as Entities.Enemy;

    enemy.sprite.x = 150;
    enemy.sprite.y = 200;
    enemy.sprite.setFrame(frameIndex);

    enemy.body.allowGravity = false;

    enemy.sprite.anims.stop();

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      enemy.sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });

    this.systemsManager.start();

    this.cameras.main.setBackgroundColor('#cccccc');
  }
}
