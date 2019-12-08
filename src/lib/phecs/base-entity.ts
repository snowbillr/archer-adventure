export class BaseEntity implements Phecs.Entity {
  public id: string;
  public components: Phecs.Component[];

  constructor() {
    this.id = this.generateUuid();
    this.components = [];
  }

  getComponent<T extends Phecs.Component>(component: T): T {
    return this.components.find(entityComponent => typeof entityComponent === typeof component) as T;
  }

  private generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}