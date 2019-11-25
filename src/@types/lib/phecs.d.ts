declare module Phecs {
  interface Entity {
    id: string;
    components: {
      [tag: string]: Component
    }
  }

  interface Component {
    [key: string]: any;
    destroy(): void;
  }

  interface ComponentConstructor {
    new(scene: Phaser.Scene, data: EntityData, entity: Entity): Component;
  }

  type EntityData = {
    x: number,
    y: number,
    scale: number,
    depth: number,
    [key: string]: any
  };
}
