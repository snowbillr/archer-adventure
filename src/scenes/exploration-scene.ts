import 'phaser';

import { BaseScene } from './base-scene';

import { adventurerStates } from '../entities/adventurer/states';
import { sheepStates } from '../entities/sheep/states';
import { arrowStates } from '../entities/arrow/states';
import { enemyStates } from '../entities/enemy/states';

import { ArrowEnemyDamageSystem } from '../systems/arrow-enemy-damage-system';
import { AdventurerDeathSystem } from '../systems/adventurer-death-system';
import { DoorSystem } from '../systems/door-system';
import { EnemyAdventurerDamageSystem } from '../systems/enemy-adventurer-damage-system';
import { HasAttachmentsSystem } from '../systems/has-attachments-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasControlsSystem } from '../systems/has-controls-system';
import { HasHitboxesSystem } from '../systems/has-hitboxes-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasInteracionCircleSystem } from '../systems/has-interaction-circle-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';
import { SignSystem } from '../systems/sign-system';

import { adventurerPrefab } from '../entities/adventurer/prefab';
import { doorPrefab } from '../entities/door/prefab';
import { enemyPrefab } from '../entities/enemy/prefab';
import { sheepPrefab } from '../entities/sheep/prefab';
import { signPrefab } from '../entities/sign/prefab';
import { arrowPrefab } from '../entities/arrow/prefab';

import { SpriteComponent } from '../components/sprite-component';

import { TiledUtil } from '../utilities/tiled-util';

export class ExplorationScene extends BaseScene {
  private isLoadingArea: boolean;

  constructor() {
    super({ key: 'exploration' });

    this.isLoadingArea = false;
  }

  create(data: any) {
    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
      { id: 'enemy', states: enemyStates },
      { id: 'sheep', states: sheepStates },
      { id: 'arrow', states: arrowStates },
    ]);

    this.areaManager.registerArea('woollards-farm', 'woollards-farm', 'core-tileset', 'core-tileset');
    this.areaManager.registerArea('woollards-house', 'woollards-house', 'core-tileset', 'core-tileset');

    this.phecs.phSystems.registerSystems(
      [
        ArrowEnemyDamageSystem,
        AdventurerDeathSystem,
        DoorSystem,
        EnemyAdventurerDamageSystem,
        HasAttachmentsSystem,
        HasBoundsSystem,
        HasControlsSystem,
        HasHitboxesSystem,
        HasHurtboxesSystem,
        HasInteracionCircleSystem,
        HasPhiniteStateMachineSystem,
        SignSystem,
      ]
    );

    this.phecs.phEntities.registerPrefab('adventurer', adventurerPrefab);
    this.phecs.phEntities.registerPrefab('arrow', arrowPrefab);
    this.phecs.phEntities.registerPrefab('door', doorPrefab);
    this.phecs.phEntities.registerPrefab('enemy', enemyPrefab);
    this.phecs.phEntities.registerPrefab('sheep', sheepPrefab);
    this.phecs.phEntities.registerPrefab('sign', signPrefab);

    this.loadNewArea(data.areaKey)
      .then(() => {
        this.scene.launch('ui');
      });
  }

  loadNewArea(key: string, markerName?: string) {
    return new Promise((resolve, reject) => {
      if (this.isLoadingArea) {
        reject();
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
        this.phecs.stop();
        this.phecs.destroy();
        this.areaManager.unload();

        this.areaManager.load(key);

        const map = this.areaManager.map;
        const tileset = this.areaManager.tileset;

        const adventurer = this.phecs.phEntities.createPrefab('adventurer', {}, 2);
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
            const entities = this.phecs.phEntities.getEntitiesByType(entityName);
            const layer = this.areaManager.getTileLayer(layerName);

            if (layer == null) {
              throw new Error(`Layer does not exist for collision pair: ${entityLayerPair}`);
            }

            for (let entity of entities) {
              const sprite = entity.getComponent(SpriteComponent).sprite;
              this.physics.add.collider(sprite, layer);
            }
          });
        }

        this.phecs.start();

        this.cameras.main.setBackgroundColor(0x888888);
        this.cameras.main.setBounds(0, 0, map.width * tileset.tileWidth, map.height * tileset.tileHeight);
        this.cameras.main.startFollow(adventurer.getComponent(SpriteComponent).sprite, true);

        this.isLoadingArea = false;
        resolve();
      }, [], null);
    });
  }
}
