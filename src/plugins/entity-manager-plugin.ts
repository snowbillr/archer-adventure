import { BaseScene } from '../scenes/base-scene';

import { adventurerPrefab } from '../entities/adventurer/prefab';
import { doorPrefab } from '../entities/door/prefab';
import { enemyPrefab } from '../entities/enemy/prefab';
import { sheepPrefab } from '../entities/sheep/prefab';
import { signPrefab } from '../entities/sign/prefab';
import { arrowPrefab } from '../entities/arrow/prefab';

type PropertiesMap = { [key: string]: any };
type EntitiesMap = { [name: string]: any[] };

export class EntityManagerPlugin extends Phaser.Plugins.ScenePlugin {
  private prefabs: PropertiesMap;

  private entitiesByName: EntitiesMap;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.prefabs = {};
    this.entitiesByName = {};

    this.registerPrefab('adventurer', adventurerPrefab);
    this.registerPrefab('arrow', arrowPrefab);
    this.registerPrefab('door', doorPrefab);
    this.registerPrefab('enemy', enemyPrefab);
    this.registerPrefab('sheep', sheepPrefab);
    this.registerPrefab('sign', signPrefab);
  }

  unload() {
    this.entitiesByName = {};
  }

  registerPrefab(key: string, properties: PropertiesMap) {
    this.prefabs[key] = properties;
  }

  createPrefab(key: string, overrides: any, scale: number, depth: number = 0, x: number = 0, y: number = 0, scalePosition = true) {
    const prefabProperties = this.prefabs[key];
    const entity = this.createEntity(prefabProperties, overrides, scale, depth, x, y, scalePosition);

    this.entitiesByName[key] = this.entitiesByName[key] || [];
    this.entitiesByName[key].push(entity);

    return entity;
  }

  getEntities(name: string) {
    return this.entitiesByName[name] || [];
  }

  private createEntity(rawProperties: any, rawOverrideProperties: any, scale: number, depth: number = 0, x: number = 0, y: number = 0, scalePosition = true) {
    const entity = {} as any;
    const overrideProperties = this.normalizeProperties(rawOverrideProperties);
    const properties = {...this.normalizeProperties(rawProperties), ...overrideProperties};
    const baseScene = this.scene as BaseScene;

    if (properties.tags) {
      properties.tags.split(',').forEach((tag: string) => {
        baseScene.systemsManager.registerEntity(entity, tag, {
          scale,
          ...this.getObjectPosition({ x, y }, scalePosition ? scale : 1),
          ...properties
        });
      });
    }

    if (entity.sprite) {
      entity.sprite.setDepth(depth);
    }

    return entity;
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

  private getObjectPosition(position: { x: number, y: number }, scale: number = 1) {
    return {
      x: position.x * scale,
      y: position.y * scale,
    };
  }
}
