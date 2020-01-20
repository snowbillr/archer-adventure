import 'phaser';

import { BaseScene } from './base-scene';

import { adventurerStates } from '../entities/adventurer/states';
import { arrowStates } from '../entities/arrow/states';
import { enemyStates } from '../entities/enemy/states';
import { oldLadyStates } from '../entities/old-lady/states';
import { oldManStates } from '../entities/old-man/states';
import { sheepStates } from '../entities/sheep/states';

import { AreaTransferSystem } from '../systems/area-transfer-system';
import { ArrowEnemyDamageSystem } from '../systems/arrow-enemy-damage-system';
import { AdventurerDeathSystem } from '../systems/adventurer-death-system';
import { AdventurerDoorSystem } from '../systems/adventurer-door-system';
import { AdventurerKnightSystem } from '../systems/adventurer-knight-system';
import { AdventurerNpcSystem } from '../systems/adventurer-npc-system';
import { AdventurerSignSystem } from '../systems/adventurer-sign-system';
import { EnemyAdventurerDamageSystem } from '../systems/enemy-adventurer-damage-system';
import { HasAttachmentsSystem } from '../systems/has-attachments-system';
import { HasBoundsSystem } from '../systems/has-bounds-system';
import { HasHitboxesSystem } from '../systems/has-hitboxes-system';
import { HasHurtboxesSystem } from '../systems/has-hurtboxes-system';
import { HasPhiniteStateMachineSystem } from '../systems/has-phinite-state-machine-system';
import { InteractionComponentSystem } from '../systems/interaction-component-system';
import { KnightForestCustceneSystem } from '../systems/knight-forest-cutscene-system';
import { SheepGateSystem } from '../systems/sheep-gate-system';

import { adventurerPrefab } from '../entities/adventurer/prefab';
import { arrowPrefab } from '../entities/arrow/prefab';
import { doorPrefab } from '../entities/door/prefab';
import { enemyPrefab } from '../entities/enemy/prefab';
import { knightPrefab } from '../entities/knight/prefab';
import { npcPrefab } from '../entities/npc/prefab';
import { sheepPrefab } from '../entities/sheep/prefab';
import { signPrefab } from '../entities/sign/prefab';

import { SpriteComponent } from '../components/sprite-component';

import { TiledUtil } from '../utilities/tiled-util';
import { SCENE_KEYS } from '../constants/scene-keys';
import { DepthManager } from '../lib/depth-manager';

export class ExplorationScene extends BaseScene {
  private isLoadingArea: boolean;

  constructor() {
    super({ key: SCENE_KEYS.exploration });

    this.isLoadingArea = false;
  }

  init() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());
  }

  create(data: any) {
    this.registerStateSets();
    this.registerAreas();
    this.registerBackgroundSets();
    this.registerSystems();
    this.registerPrefabs();

    this.transferToArea(data.areaKey, data.markerName);
    this.scene.launch(SCENE_KEYS.hud);
  }

  registerStateSets() {
    this.stateRegistrar.registerSets([
      { id: 'adventurer', states: adventurerStates },
      { id: 'arrow', states: arrowStates },
      { id: 'enemy', states: enemyStates },
      { id: 'sheep', states: sheepStates },
      { id: 'old-lady', states: oldLadyStates },
      { id: 'old-man', states: oldManStates },
    ]);
  }

  registerAreas() {
    this.areaManager.registerArea('woollards-farm', 'woollards-farm', 'core-tileset', 'core-tileset');
    this.areaManager.registerArea('woollards-house', 'woollards-house', 'core-tileset', 'core-tileset');
    this.areaManager.registerArea('forest', 'forest', 'core-tileset', 'core-tileset');
  }

  registerBackgroundSets() {
    this.areaManager.registerBackgroundSet('green-hills', ['green-hills-1', 'green-hills-2', 'green-hills-3', 'green-hills-4'])
  }

  registerSystems() {
    this.phecs.phSystems.registerSystems(
      [
        AreaTransferSystem,
        ArrowEnemyDamageSystem,
        AdventurerDeathSystem,
        AdventurerDoorSystem,
        AdventurerKnightSystem,
        AdventurerNpcSystem,
        AdventurerSignSystem,
        EnemyAdventurerDamageSystem,
        HasAttachmentsSystem,
        HasBoundsSystem,
        HasHitboxesSystem,
        HasHurtboxesSystem,
        HasPhiniteStateMachineSystem,
        InteractionComponentSystem,
        KnightForestCustceneSystem,
        SheepGateSystem,
      ]
    );
  }

  registerPrefabs() {
    this.phecs.phEntities.registerPrefab('adventurer', adventurerPrefab);
    this.phecs.phEntities.registerPrefab('arrow', arrowPrefab);
    this.phecs.phEntities.registerPrefab('door', doorPrefab);
    this.phecs.phEntities.registerPrefab('enemy', enemyPrefab);
    this.phecs.phEntities.registerPrefab('knight', knightPrefab);
    this.phecs.phEntities.registerPrefab('npc', npcPrefab);
    this.phecs.phEntities.registerPrefab('sheep', sheepPrefab);
    this.phecs.phEntities.registerPrefab('sign', signPrefab);
  }

  transferToArea(areaKey: string, markerName?: string) {
    this.cameras.main.fadeOut(0);
    this.loadNewArea(areaKey, markerName).then(() => {
      this.cameras.main.fadeIn(1000);
    });
  }

  private loadNewArea(areaKey: string, markerName?: string) {
    return new Promise((resolve, reject) => {
      if (this.isLoadingArea) {
        reject();
        return;
      } else {
        this.isLoadingArea = true;
      }

      // This delayed call is because when entities get destroyed, their event listeners will still be called for that tick of the game loop.
      // The events must be queued up or something in the event emitter, and even when all the events are cleared,
      // the listeners still get called.

      // This manifested as a problem when you entered a door and the sign interaction check got called for the
      // previous scene.
      this.time.delayedCall(0, () => {
        this.controls.stop();
        this.phecs.reset();
        this.areaManager.unload();

        this.areaManager.load(areaKey);

        const map = this.areaManager.map;
        const tileset = this.areaManager.tileset;

        const adventurer = this.phecs.phEntities.createPrefab('adventurer', {}, DepthManager.depthFor('adventurer'));
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
        const collisionMap = this.areaManager.getCollisionMap();
        Object.entries(collisionMap).forEach(([entityType, layerNames]) => {
          layerNames
            .forEach(layerName => {
              const entities = this.phecs.phEntities.getEntities(entityType);
              const layer = this.areaManager.getTileLayer(layerName);

              if (layer == null) {
                throw new Error(`Layer does not exist for collision map: ${layerName}`);
              }

              for (let entity of entities) {
                const sprite = entity.getComponent(SpriteComponent).sprite;
                this.physics.add.collider(sprite, layer);
              }
            });
        });

        this.controls.start();
        this.phecs.start();

        this.physics.world.setBounds(0, 0, map.width * tileset.tileWidth, map.height * tileset.tileHeight);

        var { x, y, width, height } = this.calculateCameraBounds(map, tileset);
        this.cameras.main.setBounds(x, y, width, height);
        this.cameras.main.startFollow(adventurer.getComponent(SpriteComponent).sprite, true);

        this.persistence.location.areaKey = areaKey;
        if (markerName) this.persistence.location.markerName = markerName;
        this.persistence.save();

        this.isLoadingArea = false;
        resolve();
      }, [], null);
    });
  }

  private shutdown() {
    this.phecs.shutdown();
    this.areaManager.unload();
  }

  // This ensures that the tilemap is centered in the screen if it is too small to fill it.
  // This works by setting the camera's top left coordinate to be < 0 so that the tilemap
  // itself doesn't move, but the camera does instead.
  private calculateCameraBounds(map: Phaser.Tilemaps.Tilemap, tileset: Phaser.Tilemaps.Tileset) {
    let x = 0;
    let y = 0;
    const width = map.width * tileset.tileWidth;
    const height = map.height * tileset.tileHeight;

    if (width < 800) {
      x = x - (800 - width) / 2;
    }

    if (height < 450) {
      y = y - (450 - height) / 2;
    }

    return { x, y, width, height };
  }
}
