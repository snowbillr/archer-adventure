import 'phaser';

import { BaseScene } from './base-scene';

import { adventurerStates } from '../entities/adventurer/states';
import { sheepStates } from '../entities/sheep/states';
import { arrowStates } from '../entities/arrow/states';
import { enemyStates } from '../entities/enemy/states';

import { SignSystem } from '../systems/sign-system';
import { DoorSystem } from '../systems/door-system';
import { HasAttachmentsSystem } from '../systems/has-attachments-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasIndicatorSystem } from '../systems/has-indicator-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasHitboxesSystem } from '../systems/has-hitboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';
import { ShootsArrowsSystem } from '../systems/shoots-arrows-system';

import { adventurerPrefab } from '../entities/adventurer/prefab';
import { doorPrefab } from '../entities/door/prefab';
import { enemyPrefab } from '../entities/enemy/prefab';
import { sheepPrefab } from '../entities/sheep/prefab';
import { signPrefab } from '../entities/sign/prefab';
import { arrowPrefab } from '../entities/arrow/prefab';

import { AdventurerComponent } from '../components/adventurer-component';
import { AreaBoundaryComponent } from '../components/area-boundary-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';
import { PortalComponent } from '../components/portal-component';
import { SpriteComponent } from '../components/sprite-component';

import { TiledUtil } from '../utilities/tiled-util';

export class ExplorationScene extends BaseScene {
  private isLoadingArea: boolean;

  constructor() {
    super({ key: 'movementTest' });

    this.isLoadingArea = false;
  }

  create(data: any) {
    this.componentManager.registerComponents(
      [
        { klass: SpriteComponent, tag: SpriteComponent.tag },
        { klass: PhysicsBodyComponent, tag: PhysicsBodyComponent.tag },
        { klass: PortalComponent, tag: PortalComponent.tag },
        { klass: AdventurerComponent, tag: AdventurerComponent.tag },
        { klass: AreaBoundaryComponent, tag: AreaBoundaryComponent.tag },
      ]
    );

    this.systemsManager.registerSystems(
      [
        { klass: DoorSystem, tags: [DoorSystem.SystemTags.door, DoorSystem.SystemTags.doorInteractor] },
        { klass: SignSystem, tags: [SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign] },
        { klass: HasAttachmentsSystem, tags: HasAttachmentsSystem.SystemTags.hasAttachments },
        { klass: HasInteracionCircleSystem, tags: HasInteracionCircleSystem.SystemTags.hasInteractionCircle },
        { klass: HasIndicatorSystem, tags: HasIndicatorSystem.SystemTags.hasIndicator },
        { klass: HasBoundsSystem, tags: HasBoundsSystem.SystemTags.hasBounds },
        { klass: HasControlsSystem, tags: HasControlsSystem.SystemTags.hasControls },
        { klass: HasHurtboxesSystem, tags: HasHurtboxesSystem.SystemTags.hasHurtboxes },
        { klass: HasHitboxesSystem, tags: HasHitboxesSystem.SystemTags.hasHitboxes },
        { klass: HasPhiniteStateMachineSystem, tags: HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachine },
        { klass: ShootsArrowsSystem, tags: ShootsArrowsSystem.SystemTags.shootsArrows },
      ]
    );

    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
      { id: 'enemy', states: enemyStates },
      { id: 'sheep', states: sheepStates },
      { id: 'arrow', states: arrowStates },
    ]);

    this.areaManager.registerArea('starting-area', 'starting-area', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);
    this.areaManager.registerArea('house', 'house', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);


    this.entityManager.registerPrefab('adventurer', adventurerPrefab);
    this.entityManager.registerPrefab('arrow', arrowPrefab);
    this.entityManager.registerPrefab('door', doorPrefab);
    this.entityManager.registerPrefab('enemy', enemyPrefab);
    this.entityManager.registerPrefab('sheep', sheepPrefab);
    this.entityManager.registerPrefab('sign', signPrefab);

    this.loadNewArea(data.areaKey);
  }

  loadNewArea(key: string, markerName?: string) {
    if (this.isLoadingArea) {
      return;
    } else {
      this.isLoadingArea = true;
    }

    // This is because when entities get destroyed, their event listeners will still be called for that tick of the game loop.
    // The events must be queued up or something in the event emitter, and even when all the events are cleared,
    // they still get called.

    // This manifested as a problem when you entered a door and the sign interaction check got called for the
    // previous scene.
    this.time.delayedCall(0, () => {
      this.systemsManager.stop();
      this.systemsManager.destroyEntities();
      this.entityManager.destroy();
      this.areaManager.unload();

      this.areaManager.load(key);

      const map = this.areaManager.map;
      const tileset = this.areaManager.tileset;

      const adventurer = this.entityManager.createPrefab('adventurer', {}, this.areaManager.scale, 2, 0, 0) as Entities.Adventurer;
      const mapProperties = TiledUtil.normalizeProperties(map.properties);

      if (markerName) {
        this.areaManager.placeEntityAtMarker(adventurer, markerName);
      } else if (mapProperties.startingMarker) {
        this.areaManager.placeEntityAtMarker(adventurer, mapProperties.startingMarker);
      }

      // At one point, I had a question about why arrows were colliding with tilemap layers.
      // I wasn't explicitly setting up that collider anywhere.
      // Turns out, the colliders were getting created because of the entry of `arrow:ground`
      // in the map properties.
      //
      // Then I asked, why was it even working, setting up the colliders before the player
      // even shoots an arrow? It took me a little while to realize that the arrows were already
      // created at this point, due to the `ShootsArrowSystem#registerEntity` method.
      if (mapProperties.entityLayerCollisions) {
        mapProperties.entityLayerCollisions.split(',').forEach((entityLayerPair: string) => {
          const [entityName, layerName] = entityLayerPair.split(':');
          const entities = this.entityManager.getEntities(entityName);
          const layer = this.areaManager.getTileLayer(layerName);

          if (layer == null) {
            throw new Error(`Layer does not exist for collision pair: ${entityLayerPair}`);
          }

          for (let entity of entities) {
            this.physics.add.collider(entity.components[SpriteComponent.tag].sprite, layer);
          }
        });
      }

      this.systemsManager.start();

      this.cameras.main.setBackgroundColor(0x888888);
      this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth * 2, map.height * tileset.tileHeight * 2);
      this.cameras.main.startFollow(adventurer.components[SpriteComponent.tag].sprite, true);

      this.isLoadingArea = false;
    }, [], null);
  }
}
