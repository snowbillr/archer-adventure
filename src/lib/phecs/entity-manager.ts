import { BaseScene } from '../../scenes/base-scene';
import { TiledUtil } from '../../utilities/tiled-util';

type PrefabMap = { [key: string]: Phecs.Prefab };
type EntitiesMap = { [name: string]: Phecs.Entity[] };
type EntityMap = { [name: string]: Phecs.Entity };

export class EntityManager {
  private scene: BaseScene;

  private prefabs: PrefabMap;
  private entitiesByName: EntitiesMap;
  private entitiesByTag: EntitiesMap;
  private entitiesById: EntityMap;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
    this.prefabs = {};
    this.entitiesByName = {};
    this.entitiesByTag = {};
    this.entitiesById = {};
  }

  registerPrefab(key: string, prefab: Phecs.Prefab) {
    this.prefabs[key] = prefab;
  }

  createPrefab(key: string, tiledProperties: any, depth: number = 0, x: number = 0, y: number = 0) {
    const prefab = this.prefabs[key];
    const entity = this.createEntity(prefab, tiledProperties, depth, x, y);

    this.entitiesByName[key] = this.entitiesByName[key] || [];
    this.entitiesByName[key].push(entity);

    return entity;
  }

  getEntitiesByName(name: string) {
    return this.entitiesByName[name] || [];
  }

  getEntitiesByTag(tag: string) {
    return this.entitiesByTag[tag] || [];
  }

  getEntityById(id: string) {
    return this.entitiesById[id];
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
    this.entitiesById = {};
  }

  private createEntity(prefab: Phecs.Prefab, tiledProperties: any, depth: number = 0, x: number = 0, y: number = 0) {
    const baseScene = this.scene as BaseScene;

    const entity = {
      id: this.generateUuid(),
      components: [],
    } as any;

    const properties = {
      ...TiledUtil.normalizeProperties(tiledProperties)
    };

    prefab.components.forEach((componentDefinition: Phecs.PrefabComponentDefinition) => {
      const component = new componentDefinition.component(baseScene, {
        x,
        y,
        depth,
        ...properties,
        ...componentDefinition.data,
      }, entity);

      entity.components.push(component);
    });

    this.entitiesById[entity.id] = entity;

    return entity;
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
