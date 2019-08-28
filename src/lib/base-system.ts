export abstract class BaseSystem<T extends Tags.Entity, U extends Tags.Entity> implements Tags.TagSystem {
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

  update(tagManager: Tags.TagManager): void {
    this.tag1s = tagManager.getEntities(this.tag1) as T[];
    this.tag2s = tagManager.getEntities(this.tag2) as U[];
  }
}
