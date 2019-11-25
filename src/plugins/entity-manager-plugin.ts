import { BaseScene } from '../scenes/base-scene';

import { TiledUtil } from '../utilities/tiled-util';
import { SpriteComponent } from '../components/sprite-component';
import { PhysicsBodyComponent } from '../components/physics-body-component';

type PropertiesMap = { [key: string]: any };
type EntitiesMap = { [name: string]: any[] };

export class EntityManagerPlugin extends Phaser.Plugins.ScenePlugin {
  private prefabs: PropertiesMap;

  private entitiesByName: EntitiesMap;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.prefabs = {};
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
    const baseScene = this.scene as BaseScene;

    const entity = {
      id: this.generateUuid(),
      components: [],
    } as any;

    const properties = {
      ...TiledUtil.normalizeProperties(rawProperties),
      ...TiledUtil.normalizeProperties(rawOverrideProperties)
    };

    if (properties.tags) {
      properties.tags.split(',').forEach((tag: string) => {
        const Component = baseScene.componentManager.getComponent(tag);

        // Temporary condition
        if (Component) {
          entity.components[tag] = new Component(baseScene, {
            scale,
            depth,
            ...this.getObjectPosition({ x, y }, scalePosition ? scale : 1),
            ...properties
          }, entity);
        }

        // Will go away
        baseScene.systemsManager.registerEntity(entity, tag, {
          scale,
          depth,
          ...this.getObjectPosition({ x, y }, scalePosition ? scale : 1),
          ...properties
        });
      });
    }

    return entity;
  }

  destroy() {
    Object.values(this.entitiesByName).flat().forEach(entity => {
      Object.values(entity.components).forEach(component => {
        (component as Phecs.Component).destroy();
      });
    });

    this.entitiesByName = {};
  }

  private getObjectPosition(position: { x: number, y: number }, scale: number = 1) {
    return {
      x: position.x * scale,
      y: position.y * scale,
    };
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
