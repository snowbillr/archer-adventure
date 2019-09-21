import 'phaser';
import { EntityManagerPlugin } from '../plugins/entity-manager-plugin';
import { BaseScene } from './base-scene';

import { SignSystem } from '../systems/sign-system';
import { DoorSystem } from '../systems/door-system';
import { HasSpriteSystem } from '../systems/has-sprite-system';
import { HasPhysicalSpriteSystem } from '../systems/has-physical-sprite-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasIndicatorSystem } from '../systems/has-indicator-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';
import { HasAreaBoundarySystem } from '../systems/has-area-boundary-system';

import { adventurerStates } from '../entities/adventurer/states';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';
import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { adventurerTestPrefab } from '../entities/adventurer/test-prefab';

export class BoundsTestScene extends Phaser.Scene {
  stateRegistrar!: StateRegistrarPlugin;
  systemsManager!: SystemsManagerPlugin
  entityManager!: EntityManagerPlugin;

  constructor() {
    super({key: 'boundsTest'})
  }

  create() {
    this.entityManager.registerPrefab('test-adventurer', adventurerTestPrefab);

    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
    ]);

    this.systemsManager.registerSystems(
      [
        { klass: DoorSystem, tags: [DoorSystem.SystemTags.door, DoorSystem.SystemTags.doorInteractor] },
        { klass: SignSystem, tags: [SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign] },
        { klass: HasSpriteSystem, tags: HasSpriteSystem.SystemTags.hasSprite },
        { klass: HasPhysicalSpriteSystem, tags: HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite },
        { klass: HasInteracionCircleSystem, tags: HasInteracionCircleSystem.SystemTags.hasInteractionCircle },
        { klass: HasIndicatorSystem, tags: HasIndicatorSystem.SystemTags.hasIndicator },
        { klass: HasAreaBoundarySystem, tags: HasAreaBoundarySystem.SystemTags.hasAreaBoundary },
        { klass: HasBoundsSystem, tags: HasBoundsSystem.SystemTags.hasBounds },
        { klass: HasControlsSystem, tags: HasControlsSystem.SystemTags.hasControls },
        { klass: HasHurtboxesSystem, tags: HasHurtboxesSystem.SystemTags.hasHurtboxes },
        { klass: HasPhiniteStateMachineSystem, tags: HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachine },
      ]
    );

    let frameIndex = 8;
    const frameText = this.add.text(200, 50, `Frame ${frameIndex}`);

    const adventurer = this.entityManager.createPrefab('test-adventurer', {}, 5, 0, 0, 0) as Entities.Adventurer;

    adventurer.sprite.x = 150;
    adventurer.sprite.y = 200;
    adventurer.sprite.setTexture('adventurer-bow')
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

    this.systemsManager.start();
  }
}
