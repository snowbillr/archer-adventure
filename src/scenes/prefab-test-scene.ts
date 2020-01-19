import 'phaser';
import { BaseScene } from './base-scene';

import { knightPrefab } from '../entities/knight/prefab';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';
import { HasAttachmentsSystem } from '../systems/has-attachments-system';
import { InteractionComponentSystem } from '../systems/interaction-component-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasHitboxesSystem } from '../systems/has-hitboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';
import { adventurerTestPrefab } from '../entities/adventurer/test-prefab';
import { arrowPrefab } from '../entities/arrow/prefab';
import { arrowStates } from '../entities/arrow/states';
import { SCENE_KEYS } from '../constants/scene-keys';

export class PrefabTestScene extends BaseScene {
  knight!: Phecs.Entity;

  constructor() {
    super({ key: SCENE_KEYS.prefabTest })
  }

  create() {
    this.phecs.phEntities.registerPrefab('knight', knightPrefab);

    this.phecs.phSystems.registerSystems(
      [
        HasBoundsSystem
      ]
    );

    // this.stateRegistrar.registerSets([
      // { id: 'arrow', states: arrowStates },
    // ]);

    let frameIndex = 22;
    const frameText = this.add.text(300, 50, `Frame ${frameIndex}`);

    const knight = this.phecs.phEntities.createPrefab('knight', {}, 1, 150, 200);

    knight.getComponent(SpriteComponent).sprite.setScale(3);
    knight.getComponent(SpriteComponent).sprite.setFrame(frameIndex);

    knight.getComponent(PhysicsBodyComponent).body.allowGravity = false;

    knight.getComponent(SpriteComponent).sprite.anims.play('knight-attack');

    this.input.keyboard.on('keydown', (e: any) => {
      switch (e.key) {
        case "ArrowUp":
          frameIndex++
          break;
        case "ArrowDown":
          frameIndex--;
          break;
      }

      knight.getComponent(SpriteComponent).sprite.setFrame(frameIndex);
      frameText.setText(`Frame ${frameIndex}`);
    });

    this.phecs.start();

    this.cameras.main.setBackgroundColor('#777777');

    this.knight = knight;
  }
}
