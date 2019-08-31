import 'phaser';
import { HasSpriteSystem } from '../../systems/has-sprite-system';
import { HasInteracionCircleSystem } from '../../systems/has-interaction-circle-system';
import { HasIndicatorSystem } from '../../systems/has-indicator-system';
import { SignSystem } from '../../systems/sign-system';

export class AreaManager {
  private scene: Phaser.Scene;
  private scale: number;

  public map: Phaser.Tilemaps.Tilemap;
  public tileset: Phaser.Tilemaps.Tileset;

  public layers: Phaser.Tilemaps.StaticTilemapLayer[];

  constructor(scene: Phaser.Scene, mapKey: string, tilesetName: string, tilesetKey: string, scale: number = 1) {
    this.scene = scene;
    this.scale = scale;

    const map = scene.make.tilemap({ key: 'starting-area' });
    const tileset = map.addTilesetImage('fantasy-platformer-core', 'fantasy-platformer-core');

    this.map = map;
    this.tileset = tileset;
    this.layers = [];
  }

  createTileLayers(layerNames: string[]) {
    layerNames.forEach(layerName => {
      const layer = this.map.createStaticLayer(layerName, this.tileset, 0, 0);
      layer.setScale(this.scale);
      this.layers.push(layer);
    });
  }

  createObjects(layerName: string, systemsManager: SystemsManager.SystemsManager): any[] {
    const createdEntities: any[] = [];
    const tiledObjects = this.map.getObjectLayer(layerName).objects;

    tiledObjects.forEach((tiledObject: Phaser.Types.Tilemaps.TiledObject) => {
      const entity = {} as any;
      console.log(tiledObject);

      tiledObject.properties.tags.split(',').forEach((tag: string) => {
        if (tag === HasSpriteSystem.SystemTags.hasSprite) {
          this.registerHasSpriteEntity(entity, tiledObject, systemsManager);
        } else if (tag === HasInteracionCircleSystem.SystemTags.hasInteractionCircle) {
          this.registerHasInteractionCircleEntity(entity, tiledObject, systemsManager);
        } else if (tag === HasIndicatorSystem.SystemTags.hasIndicator) {
          this.registerHasIndicatorEntity(entity, tiledObject, systemsManager);
        } else if (tag === SignSystem.SystemTags.sign) {
          this.registerSignSystemSignEntity(entity, tiledObject, systemsManager);
        }
      });

      createdEntities.push(entity);
    });

    return createdEntities;
  }

  private registerHasSpriteEntity(entity: object, tiledObject: Phaser.Types.Tilemaps.TiledObject, systemsManager: SystemsManager.SystemsManager) {
    const { x, y } = this.getObjectPosition(tiledObject);

    systemsManager.registerEntity(entity, HasSpriteSystem.SystemTags.hasSprite, {
      x,
      y,
      texture: tiledObject.properties.texture,
      frame: tiledObject.properties.frame,
      scale: this.scale,
    });
  }

  private registerHasInteractionCircleEntity(entity: object, tiledObject: Phaser.Types.Tilemaps.TiledObject, systemsManager: SystemsManager.SystemsManager) {
    const { x, y } = this.getObjectPosition(tiledObject);

    systemsManager.registerEntity(entity, HasInteracionCircleSystem.SystemTags.hasInteractionCircle, {
      x,
      y,
      radius: tiledObject.properties.interactionRadius,
    });
  }

  private registerHasIndicatorEntity(entity: Systems.HasSprite.Entity, tiledObject: Phaser.Types.Tilemaps.TiledObject, systemsManager: SystemsManager.SystemsManager) {
    const { x, y } = this.getObjectPosition(tiledObject);

    systemsManager.registerEntity(entity, HasIndicatorSystem.SystemTags.hasIndicator, {
      depth: 0,
      targetX: x,
      targetY: y - entity.sprite.displayHeight - 5
    });
  }

  private registerSignSystemSignEntity(entity: any, tiledObject: Phaser.Types.Tilemaps.TiledObject, systemsManager: SystemsManager.SystemsManager) {
    systemsManager.registerEntity(entity, SignSystem.SystemTags.sign);
  }

  private getObjectPosition(tiledObject: Phaser.Types.Tilemaps.TiledObject) {
    return {
      x: tiledObject.x! * this.scale,
      y: tiledObject.y! * this.scale - this.map.tileHeight,
    };
  }
}
