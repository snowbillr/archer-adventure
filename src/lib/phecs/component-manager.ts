import { EntityManager } from './entity-manager';

export class ComponentManager implements Phecs.Manager {
  private components: { [tag: string]: Phecs.ComponentConstructor };

  constructor() {
    this.components = {};
  }

  registerComponents(componentsList: {klass: Phecs.ComponentConstructor, tag: string}[]) {
    componentsList.forEach(({ klass, tag}) => this.components[tag] = klass);
  }

  getComponent(tag: string): Phecs.ComponentConstructor {
    return this.components[tag];
  }

  start(phEntities: EntityManager) {}

  stop(phEntities: EntityManager) {}

  update(phEntities: EntityManager) {}

  destroy() {}
}
