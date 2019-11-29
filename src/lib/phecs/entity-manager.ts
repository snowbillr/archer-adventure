import { BaseScene } from '../../scenes/base-scene';
import { TiledUtil } from '../../utilities/tiled-util';

type PropertiesMap = { [key: string]: any };
type EntitiesMap = { [name: string]: any[] };

export class EntityManager {
  private scene: BaseScene;

  private prefabs: PropertiesMap;
  private entitiesByName: EntitiesMap;
  private entitiesByTag: EntitiesMap;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
    this.prefabs = {};
    this.entitiesByName = {};
    this.entitiesByTag = {};
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
        this.entitiesByTag[tag] = this.entitiesByTag[tag] || [];
        this.entitiesByTag[tag].push(entity);

        const Component = baseScene.phecs.phComponents.getComponent(tag);

        // Some entities have components with no functionality, just a tag. Like the `sign`
        // The entity should still be added to the tag->entity map
        if (Component) {
          entity.components[tag] = new Component(baseScene, {
            scale,
            depth,
            ...this.getObjectPosition({ x, y }, scalePosition ? scale : 1),
            ...properties
          }, entity);
        }

        // Will go away
        baseScene.phecs.phSystems.registerEntity(entity, tag, {
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
    const entities: Phecs.Entity[] = [];
    Object.values(this.entitiesByTag).flat().forEach(entity => {
      if (!entities.includes(entity)) {
        entities.push(entity);
      }
    });

    entities.forEach(entity => {
      Object.values(entity.components).forEach(component => component.destroy());
    });

    this.entitiesByName = {};
    this.entitiesByTag = {};
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
