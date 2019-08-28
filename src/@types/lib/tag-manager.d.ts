declare namespace Tags {
  type Entity = object;

  interface TagManager {
    registerSystem(tagSystem: TagSystem): void;
    registerEntity(tag: string, entity: Entity): void;

    getEntities(tag: string): Entity[];

    update(): void;
  }

  interface TagSystem {
    update(tagManager: TagManager): void;
  }
}
