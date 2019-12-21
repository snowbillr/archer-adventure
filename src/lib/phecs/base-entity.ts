import { generateUuid } from "../../utilities/uuid-util";

export class BaseEntity implements Phecs.Entity {
  public type: string;
  public id: string;
  public components: Phecs.Component[];

  constructor(type: string) {
    this.type = type;
    this.id = generateUuid();
    this.components = [];
  }

  getComponent<T extends Phecs.ComponentConstructor>(componentKlass: T): InstanceType<T> {
    const foundComponent = this.components.find(component => {
      return component instanceof componentKlass;
    });

    if (foundComponent) {
      return foundComponent as InstanceType<T>;
    }

    throw new Error(`BaseEntity::NO_COMPONENT_${typeof componentKlass}`);
  }

  hasComponent<T extends Phecs.ComponentConstructor>(componentKlass: T): boolean {
    return this.components.some(component => {
      return component instanceof componentKlass;
    });
  }
}
