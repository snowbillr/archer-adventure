declare namespace Systems {
  type Entity = object;

  type EntityRegistrationData = { [key: string]: any };

  interface SystemsManager {
    registerSystem(tagSystem: System, tag: (string | string[])): void;
    registerEntity(entity: Entity, tag: (string | string[]), data?: EntityRegistrationData): void;

    getEntities(tag: string): Entity[];

    update(): void;
  }

  interface System {
    registerEntity(entity: Entity, data: EntityRegistrationData): void;

    update(tagManager: SystemsManager): void;
  }
}
