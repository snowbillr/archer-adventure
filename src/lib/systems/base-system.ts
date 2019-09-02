export abstract class BaseSystem<T extends any, U extends any = any> implements SystemsManager.System {
  protected tag1: string;
  protected tag2: string;

  protected entity1s: T[];
  protected entity2s: U[];

  constructor(tag1: string, tag2: string) {
    this.tag1 = tag1;
    this.tag2 = tag2;

    this.entity1s = [];
    this.entity2s = [];
  }

  abstract registerEntity(entity: object, data: SystemsManager.EntityRegistrationData): void;

  update(tagManager: SystemsManager.SystemsManager): void {
    this.entity1s = (tagManager.getEntities(this.tag1) || []) as T[];
    this.entity2s = (tagManager.getEntities(this.tag2) || []) as U[];
  }
}
