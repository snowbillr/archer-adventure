declare namespace SystemsManager {
  type EntityRegistrationData = {
    x: number,
    y: number,
    scale: number,
    [key: string]: any
  };

  interface SystemsManager {
    registerSystem(tagSystem: System, tag: (string | string[])): void;
    registerEntity<T>(entity: T, tag: (string | string[]), data?: EntityRegistrationData): void;

    getEntities<T>(tag: string): T[];

    update(): void;
  }

  interface System {
    registerEntity?(entity: any, data: EntityRegistrationData): void;

    update?(tagManager: SystemsManager): void;
  }
}
