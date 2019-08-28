declare namespace Tags {
  type Entity = object;

  type EntityRegistrationData = { [key: string]: any };

  interface TagManager {
    registerSystem(tag: (string | string[]), tagSystem: TagSystem): void;
    registerEntity(tag: (string | string[]), entity: Entity, data?: EntityRegistrationData): void;

    getEntities(tag: string): Entity[];

    update(): void;
  }

  interface TagSystem {
    registerEntity(entity: Entity, data: EntityRegistrationData): void;

    update(tagManager: TagManager): void;
  }
}
