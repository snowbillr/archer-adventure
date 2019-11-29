declare namespace SystemsManager {
  interface Entity extends Phecs.Entity {}

  type EntityRegistrationData = {
    x: number,
    y: number,
    scale: number,
    [key: string]: any
  };

  interface SystemsManager {
    registerSystem(system: System, tag: (string | string[])): void;
    registerEntity(entity: Entity, tag: (string | string[]), data: EntityRegistrationData): void;

    start(): void;
    stop(): void;

    getEntities<T extends Entity>(tag: string): T[];

    update(): void;
  }

  interface SystemConstructor {
    new(scene: Phaser.Scene): System;
  }

  interface System {
    start?(systemsManager: SystemsManager): void;
    stop?(systemsManager: SystemsManager): void;

    update?(systemsManager: SystemsManager): void;
  }
}
