import { EntityManager } from './entity-manager';

export class ComponentManager {
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
}
