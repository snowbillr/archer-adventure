export class BaseEntity implements Phecs.Entity {
  public type: string;
  public id: string;
  public components: Phecs.Component[];

  constructor(type: string) {
    this.type = type;
    this.id = this.generateUuid();
    this.components = [];
  }

  getComponent<T extends Phecs.ComponentConstructor>(componentKlass: T): InstanceType<T> {
    const foundComponent = this.components.find(component => {
      return this.isComponent(component, componentKlass);
    });

    if (foundComponent) {
      return foundComponent as InstanceType<T>;
    }

    throw new Error(`BaseEntity::NO_COMPONENT_${typeof componentKlass}`);
  }

  hasComponent<T extends Phecs.ComponentConstructor>(componentKlass: T): boolean {
    return this.components.some(component => {
      return this.isComponent(component, componentKlass);
    });
  }

  private isComponent(component: Phecs.Component, componentKlass: Phecs.ComponentConstructor) {
    return componentKlass.name === component.__proto__.constructor.name;
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}