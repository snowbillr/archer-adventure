import 'phaser';
import { BaseScene } from '../../scenes/base-scene';

export class AreaManager {
  private scene: BaseScene;
  private scale: number;

  public map!: Phaser.Tilemaps.Tilemap;
  public tileset!: Phaser.Tilemaps.Tileset;

  public tileLayers: Phaser.Tilemaps.StaticTilemapLayer[];
  public objects: { [layerName: string]: any[] };

  constructor(scene: BaseScene) {
    this.scene = scene;
    this.scale = 1;

    this.tileLayers = [];
    this.objects = {};
  }

  load(mapKey: string, tilesetName: string, tilesetKey: string, scale: number = 1) {
    const map = this.scene.make.tilemap({ key: mapKey });
    const tileset = map.addTilesetImage(tilesetName, tilesetKey);

    this.map = map;
    this.tileset = tileset;
    this.scale = scale;

    this.tileLayers = [];
    this.objects = {};

    this.createTileLayers(this.map.layers.map(layer => layer.name));
    this.createObjectLayers(this.map.objects.map(layer => layer.name));
  }

  createTileLayers(layerNames: string[]) {
    layerNames.forEach(layerName => {
      const layer = this.map.createStaticLayer(layerName, this.tileset, 0, 0);
      layer.setScale(this.scale);

      const layerProperties: any = this.normalizeProperties(layer.layer.properties);

      if (layerProperties.collides) {
        layer.forEachTile((tile: Phaser.Tilemaps.Tile) => {
          tile.setCollision(true, true, true, true, false);
        }, this, 0, 0, layer.width, layer.height, { isNotEmpty: true });

        layer.calculateFacesWithin(0, 0, layer.width, layer.height);
      }

      layer.setDepth(layerProperties.depth);

      this.tileLayers.push(layer);
    });
  }

  createObjectLayers(layerNames: string[]) {
    layerNames.forEach(layerName => this.createObjects(layerName));
  }

  createObjects(layerName: string): void {
    const layer = this.map.getObjectLayer(layerName);
    const layerProperties = this.normalizeProperties(layer.properties);
    const tiledObjects = layer.objects;

    this.objects[layerName] = [];

    tiledObjects.forEach((tiledObject: Phaser.Types.Tilemaps.TiledObject) => {
      const entity = {} as any;

      const tileProperties: any = this.normalizeProperties(tiledObject.properties);
      tiledObject.properties = tileProperties;

      tileProperties.tags.split(',').forEach((tag: string) => {
        this.registerEntity(tag, entity, tiledObject, this.scene.systemsManager);
      });

      if (tileProperties.layerCollisions) {
        tileProperties.layerCollisions.split(',').forEach((layerName: string) => {
          this.scene.physics.add.collider(entity.sprite, this.tileLayers.find(layer => layer.layer.name === layerName)!);
        });
      }

      if (layerProperties.depth && entity.sprite) {
        entity.sprite.setDepth(layerProperties.depth);
      }

      this.objects[layerName].push(entity);
    });
  }

  private registerEntity(tag: string, entity: SystemsManager.Entity, tiledObject: Phaser.Types.Tilemaps.TiledObject, systemsManager: SystemsManager.SystemsManager) {
    const { x, y } = this.getObjectPosition(tiledObject);

    systemsManager.registerEntity(entity, tag, {
      x,
      y,
      scale: this.scale,
      ...tiledObject.properties
    });
  }

  private normalizeProperties(properties: any) {
    if (Array.isArray(properties)) {
      return properties.reduce((acc: any, propertyMap: any) => {
        acc[propertyMap.name] = propertyMap.value;
        return acc;
      }, {});
    } else {
      return properties;
    }
  }

  private getObjectPosition(tiledObject: Phaser.Types.Tilemaps.TiledObject) {
    return {
      x: tiledObject.x! * this.scale,
      y: tiledObject.y! * this.scale,
    };
  }
}
