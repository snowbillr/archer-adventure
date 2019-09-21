import 'phaser';

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
import { sheepStates } from '../entities/sheep/states';

export class MovementTestScene extends BaseScene {
  constructor() {
    super({ key: 'movementTest' });
  }

  create(data: any) {
    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
      { id: 'sheep', states: sheepStates },
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

    this.areaManager.registerArea('starting-area', 'starting-area', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);
    this.areaManager.registerArea('house', 'house', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);

    this.loadNewArea(data.areaKey);
  }
}
