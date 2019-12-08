import { BaseScene } from '../../scenes/base-scene';
import { TiledUtil } from '../../utilities/tiled-util';
import { BaseEntity } from './base-entity';

type PrefabMap = { [key: string]: Phecs.Prefab };
type EntityMap = { [name: string]: Phecs.Entity };

export class EntityManager {
  private scene: BaseScene;

  private prefabs: PrefabMap;
  private entitiesById: EntityMap;
  private entities: Phecs.Entity[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
    this.prefabs = {};

    this.entitiesById = {};
    this.entities = [];
  }

  registerPrefab(key: string, prefab: Phecs.Prefab) {
    this.prefabs[key] = prefab;
  }

  createPrefab(type: string, tiledProperties: any, depth: number = 0, x: number = 0, y: number = 0) {
    const baseScene = this.scene as BaseScene;
    const entity = new BaseEntity(type);
    const prefab = this.prefabs[type];

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
    this.entities.push(entity);

    return entity;
  }

  getEntityById(id: string) {
    return this.entitiesById[id];
  }

  getEntitiesByComponent(component: Phecs.ComponentConstructor) {
    return this.entities.filter(entity => {
      return entity.hasComponent(component);
    });
  }

  getEntitiesByType(type: string) {
    return this.entities.filter(entity => entity.type === type);
  }

  destroy() {
    this.entities.forEach(entity => {
      entity.components.forEach(component => component.destroy());
    });

    this.entitiesById = {};
    this.entities = [];
  }
}
