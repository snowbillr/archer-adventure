declare namespace Tags {
  type Entity = object;

  type EntityRegistrationData = { [key: string]: any };

  interface TagManager {
    registerSystem(tagSystem: TagSystem, tag: (string | string[])): void;
    registerEntity(entity: Entity, tag: (string | string[]), data?: EntityRegistrationData): void;

    getEntities(tag: string): Entity[];

    update(): void;
  }

  interface TagSystem {
    registerEntity(entity: Entity, data: EntityRegistrationData): void;

    update(tagManager: TagManager): void;
  }
}
