declare namespace SystemsManager {
  type Entity = {
    id: string;
  }

  type EntityRegistrationData = {
    x: number,
    y: number,
    scale: number,
    [key: string]: any
  };

  interface SystemsManager {
    registerSystem(system: System, tag: (string | string[])): void;
    registerEntity(entity: Entity, tag: (string | string[]), data?: EntityRegistrationData): void;

    getEntities<T extends Entity>(tag: string): T[];

    update(): void;
  }

  interface SystemConstructor {
    new(scene: Phaser.Scene): System;
  }

  interface System {
    registerEntity?(entity: any, data: EntityRegistrationData): void;

    update?(systemsManager: SystemsManager): void;

    destroy?(entity: any): void;
  }
}
