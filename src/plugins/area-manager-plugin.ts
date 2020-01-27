import 'phaser';
import { BaseScene } from '../scenes/base-scene';
import { TiledUtil } from '../utilities/tiled-util';
import { SpriteComponent } from '../components/sprite-component';
import { ParallaxSprite } from "./parallax-sprite";
import { DepthManager } from "../lib/depth-manager";
import { ProgressionDocument } from '../persistence/progression/progression-document';
import { AreaRegistrar } from '../registrars/area-registrar';
import { BackgroundRegistrar } from '../registrars/background-registrar';

export class AreaManagerPlugin extends Phaser.Plugins.ScenePlugin {
  public map!: Phaser.Tilemaps.Tilemap;
  public tileset!: Phaser.Tilemaps.Tileset;

  public tileLayers: Phaser.Tilemaps.StaticTilemapLayer[];
  public objects: { [layerName: string]: any[] };
  public markers: { [name: string]: { x: number, y: number } };
  public zones: { [name: string]: { shape: Phaser.Geom.Rectangle, data: Record<string, any>} };

  public currentAreaKey: string;

  private background?: ParallaxSprite;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.tileLayers = [];
    this.objects = {};
    this.markers = {};
    this.zones = {};

    this.currentAreaKey = '';
  }

  load(key: string) {
    this.currentAreaKey = key;
    const area = AreaRegistrar.getArea(key);

    const map = this.scene.make.tilemap({ key: area.mapKey });
    const tileset = map.addTilesetImage(area.tilesetName, area.tilesetKey);

    this.map = map;
    this.tileset = tileset;

    this.tileLayers = [];
    this.objects = {};

    this.loadMarkers();
    this.loadZones();

    this.createBackground(TiledUtil.normalizeProperties(this.map.properties));
    this.createTileLayers(this.map.layers.map(layer => layer.name));
    this.createEntities(this.map.objects.map(layer => layer.name));
  }

  unload() {
    this.currentAreaKey = '';
    this.objects = {};
    this.markers = {};
    this.zones = {};

    this.tileLayers.forEach(layer => layer.destroy());
    this.tileLayers = [];

    delete this.tileset;

    if (this.map) {
      this.map.destroy();
    }

    if (this.background) {
      this.background.destroy();
    }
  }

  placeEntityAtMarker(entity: Phecs.Entity, markerName: string) {
    const marker = this.markers[markerName];
    const sprite = entity.getComponent(SpriteComponent).sprite;

    entity.getComponent(SpriteComponent).sprite.setPosition(marker.x, marker.y - sprite.height * sprite.originY);
  }

  getTileLayer(name: string) {
    return this.tileLayers.find(layer => layer.layer.name === name);
  }

  getZone(name: string) {
    return this.zones[name];
  }

  getCollisionMap(): Record<string, string[]> {
    const rawCollisions = TiledUtil.normalizeProperties(this.map.properties).entityLayerCollisions;
    const entityLayerPairs = rawCollisions.split(',');
    return entityLayerPairs.reduce((map: { [key: string]: string[] }, pair: string) => {
      const [entity, layer] = pair.split(':');

      map[entity] = map[entity] || [];
      map[entity].push(layer);

      return map;
    }, {});
  }

  private loadMarkers() {
    this.map.objects.forEach(objectLayer => {
      objectLayer.objects.forEach(object => {
        const properties = TiledUtil.normalizeProperties(object.properties);
        if (properties.marker) {
          this.markers[object.name] = {
            x: object.x!,
            y: object.y!,
          };
        }
      });
    });
  }

  private loadZones() {
    this.map.objects.forEach(objectLayer => {
      objectLayer.objects.forEach(object => {
        const properties = TiledUtil.normalizeProperties(object.properties);
        if (properties.zone) {
          this.zones[object.name] = {
            shape: new Phaser.Geom.Rectangle(object.x!, object.y!, object.width!, object.height!),
            data: TiledUtil.normalizeProperties(object.properties),
          };
        }
      });
    })
  }

  private createTileLayers(layerNames: string[]) {
    layerNames.forEach(layerName => {
      const layer = this.map.createStaticLayer(layerName, this.tileset);

      const layerProperties: any = TiledUtil.normalizeProperties(layer.layer.properties);
  
      if (layerProperties.collides) {
        layer.forEachTile((tile: Phaser.Tilemaps.Tile) => {
          tile.setCollision(true, true, true, true, false);
        }, this, 0, 0, layer.width, layer.height, { isNotEmpty: true });
  
        // this is an optimization for not calculating the faces immediately in the forEachTile loop above
        layer.calculateFacesWithin(0, 0, layer.width, layer.height);
      }
  
      layer.setDepth(DepthManager.depthFor(layerProperties.depth));
  
      this.tileLayers.push(layer);
    });
  }

  private createEntities(layerNames: string[]) {
    layerNames.forEach(layerName => {
      const layer = this.map.getObjectLayer(layerName);
      const layerProperties = TiledUtil.normalizeProperties(layer.properties);
      const tiledObjects = layer.objects;
  
      this.objects[layerName] = [];
  
      const scene = (this.scene as BaseScene);
      tiledObjects.forEach((tiledObject: Phaser.Types.Tilemaps.TiledObject) => {
        let entity = null;
  
        if (tiledObject.type) {
          const properties: Record<string, any> = {
            ...TiledUtil.normalizeProperties(tiledObject.properties),
            name: tiledObject.name
          };

          if (properties.createConditionGate) {
           const progressionIdentifier = ProgressionDocument.parseProgressionKey(properties.createConditionGate);

            const isCompleted = (this.scene as BaseScene).persistence.progression.areCompleted([
              progressionIdentifier
            ]);

            if (isCompleted !== properties.createCondition) return;
          }

          entity = scene.phecs.phEntities.createPrefab(tiledObject.type, properties, DepthManager.depthFor(layerProperties.depth), tiledObject.x, tiledObject.y);
          this.objects[layerName].push(entity);
        }
      }); 
    });
  }

  private createBackground(properties: { [key: string]: string }) {
    if (properties.backgroundSet) {
      const layerNames = BackgroundRegistrar.getBackgroundSet(properties.backgroundSet);
      const layersConfig: ParallaxSprite.LayersConfig = layerNames.map(layerName => { return { key: layerName } });

      this.background = (this.scene.add as any).parallaxSprite(layersConfig, DepthManager.depthFor('parallax')) as ParallaxSprite;
      this.background.scrollWithCamera(this.scene.cameras.main);
    } else if (properties.backgroundColor) {
      this.scene.cameras.main.setBackgroundColor(`#${properties.backgroundColor}`)
    }
  }
}
