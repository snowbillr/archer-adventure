import 'phaser';

import { BaseScene } from './base-scene';

import { SignSystem } from '../systems/sign-system';
import { HasSpriteSystem } from '../systems/has-sprite-system';
import { HasPhysicalSpriteSystem } from '../systems/has-physical-sprite-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasIndicatorSystem } from '../systems/has-indicator-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';

import { AreaManager } from '../lib/area-manager/area-manager';

import { adventurerStates } from '../entities/adventurer/states';
import { sheepStates } from '../entities/sheep/states';
import { HasAreaBoundarySystem } from '../systems/has-area-boundary-system';

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

    const { tilemapKey, tilesetName, tilesetKey, tileLayers, objectLayers } = data;

    const areaManager = new AreaManager(this, tilemapKey, tilesetName, tilesetKey, 2);
    areaManager.createTileLayers(tileLayers);
    areaManager.createObjectLayers(objectLayers);

    const adventurer: Entities.Adventurer  = areaManager.createObjects('adventurer')[0];

    /*
    const areaManager = new AreaManager(this, 'house', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);
    areaManager.createTileLayers([
      'ground',
      'background-base',
      'background-details',
    ]);

    const adventurer: Entities.Adventurer  = areaManager.createObjects('adventurer', this.systemsManager)[0];
    */

    const map = areaManager.map;
    const tileset = areaManager.tileset;
    this.cameras.main.setBackgroundColor(0xCCCCCC);
    this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
    this.cameras.main.startFollow(adventurer.sprite, true);
  }

  update() {
    this.systemsManager.update();
  }
}
