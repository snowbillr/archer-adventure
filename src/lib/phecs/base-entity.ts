export class BaseEntity implements Phecs.Entity {
  public type: string;
  public id: string;
  public components: Phecs.Component[];

  constructor(type: string) {
    this.type = type;
    this.id = this.generateUuid();
    this.components = [];
  }

  // TODO: make this a util method
  getComponent<T extends Phecs.ComponentConstructor>(component: T): InstanceType<T> {
    const foundComponent = this.components.find(entityComponent => {
      return component.name === entityComponent.__proto__.constructor.name;
    });

    if (foundComponent) {
      return foundComponent as InstanceType<T>;
    }

    throw new Error(`BaseEntity::NO_COMPONENT_${typeof component}`);
  }

  hasComponent<T extends Phecs.ComponentConstructor>(component: T): boolean {
    return this.components.some(entityComponent => {
      return component.name === entityComponent.__proto__.constructor.name;
    });
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}