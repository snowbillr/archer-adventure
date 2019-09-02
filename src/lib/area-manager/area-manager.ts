import 'phaser';

export class AreaManager {
  private scene: Phaser.Scene;
  private scale: number;

  public map: Phaser.Tilemaps.Tilemap;
  public tileset: Phaser.Tilemaps.Tileset;

  public layers: Phaser.Tilemaps.StaticTilemapLayer[];

  constructor(scene: Phaser.Scene, mapKey: string, tilesetName: string, tilesetKey: string, scale: number = 1) {
    this.scene = scene;
    this.scale = scale;

    const map = scene.make.tilemap({ key: mapKey });
    const tileset = map.addTilesetImage(tilesetName, tilesetKey);

    this.map = map;
    this.tileset = tileset;
    this.layers = [];
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

      this.layers.push(layer);
    });
  }

  createObjects(layerName: string, systemsManager: SystemsManager.SystemsManager): any[] {
    const createdEntities: any[] = [];
    const layer = this.map.getObjectLayer(layerName);
    const layerProperties = this.normalizeProperties(layer.properties);
    const tiledObjects = layer.objects;

    tiledObjects.forEach((tiledObject: Phaser.Types.Tilemaps.TiledObject) => {
      const entity = {} as any;

      const tileProperties: any = this.normalizeProperties(tiledObject.properties);
      tiledObject.properties = tileProperties;

      tileProperties.tags.split(',').forEach((tag: string) => {
        this.registerEntity(tag, entity, tiledObject, systemsManager);
      });

      if (tileProperties.layerCollisions) {
        tileProperties.layerCollisions.split(',').forEach((layerName: string) => {
          this.scene.physics.add.collider(entity.sprite, this.layers.find(layer => layer.layer.name === layerName)!);
        });
      }

      if (layerProperties.depth && entity.sprite) {
        entity.sprite.setDepth(layerProperties.depth);
      }

      createdEntities.push(entity);
    });

    return createdEntities;
  }

  private registerEntity(tag: string, entity: Systems.HasSprite.Entity, tiledObject: Phaser.Types.Tilemaps.TiledObject, systemsManager: SystemsManager.SystemsManager) {
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
