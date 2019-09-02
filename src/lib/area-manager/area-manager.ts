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

      const properties = layer.layer.properties as any;

      const collisionProperty = properties.collisionProperty;
      if (collisionProperty) {
        layer.setCollisionByProperty({ [collisionProperty]: true })
      }

      layer.setDepth(properties.depth);

      this.layers.push(layer);
    });
  }

  createObjects(layerName: string, systemsManager: SystemsManager.SystemsManager): any[] {
    const createdEntities: any[] = [];
    const layer = this.map.getObjectLayer(layerName);
    const layerProperties = layer.properties as any;
    const tiledObjects = layer.objects;

    tiledObjects.forEach((tiledObject: Phaser.Types.Tilemaps.TiledObject) => {
      const entity = {} as any;

      tiledObject.properties.tags.split(',').forEach((tag: string) => {
        this.registerEntity(tag, entity, tiledObject, systemsManager);
      });

      if (tiledObject.properties.layerCollisions) {
        tiledObject.properties.layerCollisions.split(',').forEach((layerName: string) => {
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

  private getObjectPosition(tiledObject: Phaser.Types.Tilemaps.TiledObject) {
    return {
      x: tiledObject.x! * this.scale,
      y: tiledObject.y! * this.scale,
    };
  }
}
