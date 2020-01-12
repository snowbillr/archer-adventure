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

  createPrefab(type: string, rawTiledProperties: any, depth: number = 0, x: number = 0, y: number = 0) {
    const baseScene = this.scene as BaseScene;
    const entity = new BaseEntity(type);
    const prefab = this.prefabs[type];

    const properties = {
      x,
      y,
      depth,
      ...TiledUtil.normalizeProperties(rawTiledProperties)
    };

    this.getComponentDefinitions(prefab).forEach((componentDefinition: Phecs.PrefabComponentDefinition) => {
      const component = new componentDefinition.component(baseScene, {
        ...componentDefinition.data,
        ...properties,
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

  getEntities(identifier: Phecs.EntityIdentifier) {
    if (typeof identifier === 'string') {
      return this.getEntitiesByType(identifier);
    } else if (typeof identifier === 'function') {
      return this.getEntitiesByComponent(identifier);
    } else {
      throw new Error(`Phecs.EntityManager::BAD_ENTITY_IDENTIFIER::${identifier}`);
    }
  }

  destroy() {
    this.entities.forEach(entity => {
      entity.components.forEach(component => component.destroy());
    });

    this.entitiesById = {};
    this.entities = [];
  }

  private getComponentDefinitions(prefab: Phecs.Prefab): Phecs.PrefabComponentDefinition[] {
    return prefab.components.map(componentDefinition => {
      if (typeof componentDefinition === 'function') {
        return {
          component: componentDefinition,
        };
      }
      else {
        return componentDefinition;
      }
    });
  }

  private getEntitiesByComponent(component: Phecs.ComponentConstructor) {
    return this.entities.filter(entity => {
      return entity.hasComponent(component);
    });
  }

  private getEntitiesByType(type: string) {
    return this.entities.filter(entity => entity.type === type);
  }

}
