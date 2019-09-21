import 'phaser';

import { SystemsManagerPlugin } from '../plugins/systems-manager-plugin';
import { StateRegistrarPlugin } from '../plugins/state-registrar-plugin';
import { AreaManagerPlugin } from '../plugins/area-manager-plugin';
import { EntityManagerPlugin } from '../plugins/entity-manager-plugin';

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

export abstract class BaseScene extends Phaser.Scene {
  areaManager!: AreaManagerPlugin;
  entityManager!: EntityManagerPlugin;
  stateRegistrar!: StateRegistrarPlugin;
  systemsManager!: SystemsManagerPlugin;

  create(data: any) {
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
  }

  loadNewArea(key: string, markerName?: string) {
    // Loading a new area needs to be 'enqueued' as an action.
    // When this happens, the entities get destroyed, but their event listeners will still be called.
    // They must be queued up or something in the event emitter, and even when all the events are cleared,
    // they still get called.

    // This manifested as a problem when you entered a door and the sign interaction check got called for the
    // previous scene.
    this.time.delayedCall(0, () => {
      this.systemsManager.stop();
      this.systemsManager.destroyEntities();
      this.areaManager.unload();
      this.entityManager.unload();

      this.areaManager.load(key);

      const map = this.areaManager.map;
      const tileset = this.areaManager.tileset;

      const adventurer = this.entityManager.createPrefab('adventurer', {}, this.areaManager.scale, 2, 0, 0) as Entities.Adventurer;
      const mapProperties = this.normalizeProperties(map.properties);

      if (markerName) {
        this.areaManager.placeEntityAtMarker(adventurer, markerName);
      } else if (mapProperties.startingMarker) {
        this.areaManager.placeEntityAtMarker(adventurer, mapProperties.startingMarker);
      }

      if (mapProperties.entityLayerCollisions) {
        mapProperties.entityLayerCollisions.split(',').forEach((entityLayerPair: string) => {
          const [entityName, layerName] = entityLayerPair.split(':');
          const entity = this.entityManager.getEntity(entityName);
          this.physics.add.collider(entity.sprite, this.areaManager.tileLayers.find(layer => layer.layer.name === layerName)!);
        });
      }

      this.systemsManager.start();

      this.cameras.main.setBackgroundColor(0x888888);
      this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
      this.cameras.main.startFollow(adventurer.sprite, true);
    }, [], null);
  }

  private normalizeProperties(properties: any): { [key: string]: any } {
    if (Array.isArray(properties)) {
      return properties.reduce((acc: any, propertyMap: any) => {
        acc[propertyMap.name] = propertyMap.value;
        return acc;
      }, {});
    } else {
      return properties || {};
    }
  }
}
