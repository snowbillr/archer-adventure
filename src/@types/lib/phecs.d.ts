declare module Phecs {
  interface Component {
    [key: string]: any;
  }

  interface Entity {
    id: string;
    sprite: Phaser.GameObjects.Sprite; // all entities have a sprite
    body: Phaser.Physics.Arcade.Body;
    components: {
      [tag: string]: Component
    }
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
