declare module Phecs {
  interface Component {
    [key: string]: any;
  }

  interface Entity {
    id: string;
    sprite: Phaser.GameObjects.Sprite; // all entities have a sprite
    components: {
      [tag: string]: Component
    }
  }

  interface ComponentConstructor {
    new(scene: Phaser.Scene, data: EntityData): Component;
  }

  type EntityData = {
    x: number,
    y: number,
    scale: number,
    depth: number,
    [key: string]: any
  };
}
