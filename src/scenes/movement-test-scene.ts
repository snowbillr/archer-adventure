import 'phaser';

import { SystemsManager } from '../lib/systems/systems-manager';
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

import { movementAttributes } from '../entities/adventurer/movement-attributes';
import { states } from '../entities/adventurer/states';

export class MovementTestScene extends Phaser.Scene {
  private systemsManager: SystemsManager;

  constructor(config: any) {
    super(config);

    this.systemsManager = new SystemsManager();
  }

  preload() {
    // adventurer
    this.load.spritesheet('adventurer-core', '/assets/sprites/adventurer/adventurer-core.png', { frameWidth: 50, frameHeight: 37 })
    this.load.spritesheet('adventurer-bow', '/assets/sprites/adventurer/adventurer-bow.png', { frameWidth: 50, frameHeight: 37 })

    this.load.animation('adventurer-animations', '/assets/animations/adventurer.json');
    this.load.json('adventurer-hitboxes', '/assets/hurtboxes/adventurer.json');
    this.load.json('adventurer-bounds', '/assets/bounds/adventurer.json');

    // indicators
    this.load.spritesheet('indicator-down', '/assets/sprites/indicators/indicator-down.png', { frameWidth: 16, frameHeight: 16 })
    this.load.animation('indicator-animations', '/assets/animations/indicators.json');

    // tilemap spritesheet
    this.load.spritesheet('fantasy-platformer-core-spritesheet', '/assets/tilesets/fantasy-platformer-core.png', { frameWidth: 16, frameHeight: 16 });

    // tilemap
    this.load.image('fantasy-platformer-core', '/assets/tilesets/fantasy-platformer-core.png');
    this.load.tilemapTiledJSON('starting-area', '/assets/tilemaps/starting-area.json')
  }

  create() {
    const TILEMAP_SCALE = 2;

    const areaManager = new AreaManager(this, 'starting-area', 'fantasy-platformer-core', 'fantasy-platformer-core', 2);
    const map = areaManager.map;
    areaManager.createTileLayers([
      'ground',
      'background-base',
      'background-details',
      'foreground'
    ]);

    // const signs = map.getObjectLayer('signs');
    // const testSign = signs.objects[0] as { x: number, y: number };
    // const signEntity: Entities.Sign = {} as Entities.Sign;

    const adventurer = map.getObjectLayer('adventurer').objects[0] as { x: number, y: number };
    const adventurerEntity: Entities.Adventurer = {} as Entities.Adventurer;

    this.systemsManager.registerSystem(new SignSystem(), [SignSystem.SystemTags.interactor, SignSystem.SystemTags.sign]);
    this.systemsManager.registerSystem(new HasSpriteSystem(this), HasSpriteSystem.SystemTags.hasSprite);
    this.systemsManager.registerSystem(new HasPhysicalSpriteSystem(this), HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite);
    this.systemsManager.registerSystem(new HasInteracionCircleSystem(this), HasInteracionCircleSystem.SystemTags.hasInteractionCircle);
    this.systemsManager.registerSystem(new HasIndicatorSystem(this), HasIndicatorSystem.SystemTags.hasIndicator);
    this.systemsManager.registerSystem(new HasBoundsSystem(this), HasBoundsSystem.SystemTags.hasBounds);
    this.systemsManager.registerSystem(new HasControlsSystem(this), HasControlsSystem.SystemTags.hasControls);
    this.systemsManager.registerSystem(new HasHurtboxesSystem(this), HasHurtboxesSystem.SystemTags.hasHurtboxes);
    this.systemsManager.registerSystem(new HasPhiniteStateMachineSystem(this), HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachineSystem);

    areaManager.createObjects('signs', this.systemsManager);

    this.systemsManager.registerEntity(adventurerEntity, HasPhysicalSpriteSystem.SystemTags.hasPhysicalSprite, {
      x: adventurer.x * TILEMAP_SCALE,
      y: adventurer.y * TILEMAP_SCALE,
      texture: 'adventurer-core',
      frame: 0,
      scale: TILEMAP_SCALE,
      maxVelocity: {
        x: movementAttributes.maxVelocity
      }
    });

    this.systemsManager.registerEntity(adventurerEntity, HasHurtboxesSystem.SystemTags.hasHurtboxes, {
      animationsKey: 'adventurer-hitboxes',
      debug: false,
    });

    this.systemsManager.registerEntity(adventurerEntity, HasBoundsSystem.SystemTags.hasBounds, {
      boundsKey: 'adventurer-bounds'
    });

    this.systemsManager.registerEntity(adventurerEntity, HasControlsSystem.SystemTags.hasControls);

    this.systemsManager.registerEntity(adventurerEntity, HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachineSystem, {
      states: states,
      initialState: states.find(s => s.id === 'adventurer-stand'),
    });

    this.systemsManager.registerEntity(adventurerEntity, HasInteracionCircleSystem.SystemTags.hasInteractionCircle, { x: adventurerEntity.sprite.x, y: adventurerEntity.sprite.y, radius: 30 });

    this.systemsManager.registerEntity(adventurerEntity, SignSystem.SystemTags.interactor);


    // more area stuff

    const groundLayer = areaManager.layers[0];
    groundLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(adventurerEntity.sprite, groundLayer);

    this.cameras.main.setBounds(0, 0, map.width * areaManager.tileset.tileWidth * 2, map.height * areaManager.tileset.tileHeight * 2);
    this.cameras.main.startFollow(adventurerEntity.sprite, true);
  }

  update() {
    this.systemsManager.update();
  }
}
