import 'phaser';
import { BaseScene } from '../scenes/base-scene';

export class AreaManagerPlugin extends Phaser.Plugins.ScenePlugin {
  private scale: number;

  public map!: Phaser.Tilemaps.Tilemap;
  public tileset!: Phaser.Tilemaps.Tileset;

  public tileLayers: Phaser.Tilemaps.StaticTilemapLayer[];
  public objects: { [layerName: string]: any[] };
  public markers: { name: string, x: number, y: number }[];

  private areaMap: { [areaName: string]: any };

  public adventurer!: Entities.Adventurer;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.scale = 1;

    this.tileLayers = [];
    this.objects = {};
    this.markers = [];

    this.areaMap = {};
  }

  registerArea(key: string, mapKey: string, tilesetName: string, tilesetKey: string, scale: number = 1) {
    this.areaMap[key] = {
      mapKey,
      tilesetName,
      tilesetKey,
      scale
    };
  }

  load(key: string) {
    const area = this.areaMap[key];

    const map = this.scene.make.tilemap({ key: area.mapKey });
    const tileset = map.addTilesetImage(area.tilesetName, area.tilesetKey);

    this.map = map;
    this.tileset = tileset;
    this.scale = area.scale;

    this.tileLayers = [];
    this.objects = {};

    this.loadMarkers();
    this.createTileLayers(this.map.layers.map(layer => layer.name));
    this.createObjectLayers(this.map.objects.map(layer => layer.name));
    this.createAdventurer();
  }

  unload() {
    this.objects = {};

    this.tileLayers.forEach(layer => layer.destroy());
    this.tileLayers = [];

    delete this.tileset;

    if (this.map) {
      this.map.destroy();
    }
  }

  private loadMarkers() {
    this.map.objects.forEach(objectLayer => {
      objectLayer.objects.forEach(object => {
        const properties = this.normalizeProperties(object.properties);
        if (properties.marker) {
          this.markers.push({
            name: object.name,
            x: object.x! * this.scale,
            y: object.y! * this.scale
          });
        }
      });
    });
  }

  private createTileLayers(layerNames: string[]) {
    layerNames.forEach(layerName => this.createTileLayer(layerName));
  }

  private createTileLayer(layerName: string): void {
    const layer = this.map.createStaticLayer(layerName, this.tileset, 0, 0);
    layer.setScale(this.scale);

    const layerProperties: any = this.normalizeProperties(layer.layer.properties);

    if (layerProperties.collides) {
      layer.forEachTile((tile: Phaser.Tilemaps.Tile) => {
        tile.setCollision(true, true, true, true, false);
      }, this, 0, 0, layer.width, layer.height, { isNotEmpty: true });

      layer.calculateFacesWithin(0, 0, layer.width, layer.height);
    }

    layer.setDepth(layerProperties.depth)

    this.tileLayers.push(layer);
  }

  private createObjectLayers(layerNames: string[]) {
    layerNames.forEach(layerName => this.createObjects(layerName));
  }

  private createObjects(layerName: string): void {
    const layer = this.map.getObjectLayer(layerName);
    const layerProperties = this.normalizeProperties(layer.properties);
    const tiledObjects = layer.objects;

    this.objects[layerName] = [];

    tiledObjects.forEach((tiledObject: Phaser.Types.Tilemaps.TiledObject) => {
      const entity = this.createObject(tiledObject.properties, layerProperties.depth, tiledObject.x, tiledObject.y);

      this.objects[layerName].push(entity);
    });
  }

  private createObject(properties: { [key: string]: any }, depth?: number, x?: number, y?: number) {
    const entity = {} as any;
    const props = this.normalizeProperties(properties);
    const fakeTiledObject = {
      x: x,
      y: y,
      properties: props,
    };

    if (props.tags) {
      props.tags.split(',').forEach((tag: string) => {
        this.registerEntity(tag, entity, fakeTiledObject as Phaser.Types.Tilemaps.TiledObject);
      });
    }

    if (props.layerCollisions) {
      props.layerCollisions.split(',').forEach((layerName: string) => {
        this.scene.physics.add.collider(entity.sprite, this.tileLayers.find(layer => layer.layer.name === layerName)!);
      });
    }

    if (depth && entity.sprite) {
      entity.sprite.setDepth(depth);
    }

    return entity;
  }

  private createAdventurer() {
    const adventurerProps = {
      boundsKey: "adventurer-bounds",
      frame: 0,
      hurtboxesDebug: false,
      hurtboxesKey: "adventurer-hurtboxes",
      initialStateId: "adventurer-stand",
      interactionRadius: 30,
      layerCollisions: "ground",
      maxVelocityX: 350,
      stateSet: "adventurer",
      tags: "hasPhysicalSprite,hasHurtboxes,hasBounds,hasControls,hasInteractionCircle,sign-interactor,hasPhiniteStateMachine,doorInteractor",
      texture: "adventurer-core",
    };

   this.adventurer = this.createObject(adventurerProps, 2, 0, 0) as Entities.Adventurer;

    this.placeAdventurerAtStart();
  }

  private placeAdventurerAtStart() {
    const mapProperties = this.normalizeProperties(this.map.properties);
    if (mapProperties.startingMarker) {
      console.log(mapProperties.startingMarker)
      console.log(this.markers)
      const marker = this.markers.find(m => m.name === mapProperties.startingMarker);
      // const adventurer = this.objects['adventurer'][0];
      const adventurer = this.adventurer;
      adventurer.sprite.setPosition(marker!.x, marker!.y - adventurer.sprite.displayHeight / this.scale);
    }
  }

  private registerEntity(tag: string, entity: SystemsManager.Entity, tiledObject: Phaser.Types.Tilemaps.TiledObject) {
    const { x, y } = this.getObjectPosition(tiledObject);

    (this.scene as BaseScene).systemsManager.registerEntity(entity, tag, {
      x,
      y,
      scale: this.scale,
      ...tiledObject.properties
    });
  }

  private normalizeProperties(properties: any): { [key: string]: any } {
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
