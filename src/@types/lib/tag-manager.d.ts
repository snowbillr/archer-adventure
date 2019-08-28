declare namespace Tags {
  type Entity = object;

  interface TagManager {
    registerSystem(tag: (string | string[]), tagSystem: TagSystem): void;
    registerEntity(entity: Entity, tag: (string | string[])): void;

    getEntities(tag: string): Entity[];

    update(): void;
  }

  interface TagSystem {
    registerEntity(entity: Entity): void;

    update(tagManager: TagManager): void;
  }
}
