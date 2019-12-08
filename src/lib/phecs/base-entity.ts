export class BaseEntity implements Phecs.Entity {
  public id: string;
  public components: Phecs.Component[];

  constructor() {
    this.id = this.generateUuid();
    this.components = [];
  }

  getComponent<T extends Phecs.ComponentConstructor>(component: T): InstanceType<T> {
    const foundComponent = this.components.find(entityComponent => typeof entityComponent === typeof component);

    if (foundComponent) {
      return foundComponent as InstanceType<T>;
    }

    throw new Error(`BaseEntity::NO_COMPONENT_${typeof component}`);
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}