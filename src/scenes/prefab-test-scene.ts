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
import { npcPrefab } from '../entities/npc/prefab';

export class PrefabTestScene extends BaseScene {
  constructor() {
    super({ key: SCENE_KEYS.prefabTest })
  }

  create() {
    // this.phecs.phEntities.registerPrefab('npc', npcPrefab);

    /*
    this.phecs.phSystems.registerSystems(
      [
        HasBoundsSystem
      ]
    );
    */


    let frameIndex = 21;
    const frameText = this.add.text(300, 50, `Frame ${frameIndex}`);

    // const entity = this.phecs.phEntities.createPrefab('adventurer', {}, 1, 150, 200);

    // entity.getComponent(SpriteComponent).sprite.setScale(4);
    // entity.getComponent(SpriteComponent).sprite.setFrame(frameIndex);

    // entity.getComponent(PhysicsBodyComponent).body.allowGravity = false;

    const sprite = this.add.sprite(200, 100, 'knight2', 'attack1_3');
    sprite.setScale(3);

    sprite.anims.play('knight2-attack-horizontal');

    /*
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
    */

    this.phecs.start();

    this.cameras.main.setBackgroundColor('#777777');
  }
}
