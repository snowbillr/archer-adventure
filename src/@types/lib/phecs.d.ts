declare module Phecs {
  interface Entity {
    id: string;
    components: {
      [tag: string]: Component
    }
  }

  type EntityData = {
    x: number,
    y: number,
    depth: number,
    [key: string]: any
  };

  interface Component {
    [key: string]: any;
    destroy(): void;
  }

  interface ComponentConstructor {
    new(scene: Phaser.Scene, data: EntityData, entity: Entity): Component;
  }

  interface System {
    start?(phEntities: any): void;
    stop?(phEntities: any): void;
    update?(phEntities: any): void;
  }

  interface SystemConstructor {
    new(scene: Phaser.Scene): System;
  }
}
