export abstract class BaseSystem<T extends SystemsManager.Entity, U extends SystemsManager.Entity = SystemsManager.Entity> implements SystemsManager.System {
  protected tag1: string;
  protected tag2: string;

  protected tag1s: T[];
  protected tag2s: U[];

  constructor(tag1: string, tag2: string) {
    this.tag1 = tag1;
    this.tag2 = tag2;

    this.tag1s = [];
    this.tag2s = [];
  }

  registerEntity(entity: object, data: SystemsManager.EntityRegistrationData): void {
    // this is where you could do the `create` work of a component
    // and assign any properties to the entity
      // what about functions?
  }

  update(tagManager: SystemsManager.SystemsManager): void {
    this.tag1s = (tagManager.getEntities(this.tag1) || []) as T[];
    this.tag2s = (tagManager.getEntities(this.tag2) || []) as U[];
  }
}
