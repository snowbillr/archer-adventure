declare module Attachments {
  type ShapeType = 'rectangle' | 'circle';

  interface RectangleConfig {
    shape: ShapeType;
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  }

  interface CircleConfig {
    shape: ShapeType;
    offsetX: number;
    offsetY: number;
    radius: number;
  }

  type ShapeConfig = RectangleConfig | CircleConfig;

  interface Shape {
    setConfig(config: ShapeConfig): void
    disable(): void;
    overlapsRectangle(rectangle: Phaser.Geom.Rectangle): boolean;
    overlapsCircle(circle: Phaser.Geom.Circle): boolean;
    syncToSprite(sprite: Phaser.GameObjects.Sprite): void;
    destroy(): void;
  }
}