import 'phaser';
import { BaseScene } from './base-scene';

import { enemyPrefab } from '../entities/enemy/prefab';
import { enemyStates } from '../entities/enemy/states';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';

export class PrefabTestScene extends BaseScene {
  constructor() {
    super({key: 'prefabTest'})
  }

  create() {
    this.phecs.phEntities.registerPrefab('enemy', enemyPrefab);

    this.stateRegistrar.registerSets([
      { id: 'enemy', states: enemyStates },
    ]);

    let frameIndex = 0;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    const scale = 5;
    const enemy = this.phecs.phEntities.createPrefab('enemy', {}, scale, 0, 0, 0);

    enemy.components[SpriteComponent.tag].sprite.x = 150;
    enemy.components[SpriteComponent.tag].sprite.y = 200;
    enemy.components[SpriteComponent.tag].sprite.setFrame(frameIndex);

    enemy.components[PhysicsBodyComponent.tag].body.allowGravity = false;

    enemy.components[SpriteComponent.tag].sprite.anims.stop();

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      enemy.components[SpriteComponent.tag].sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });

    this.phecs.start();

    this.cameras.main.setBackgroundColor('#cccccc');
  }
}
