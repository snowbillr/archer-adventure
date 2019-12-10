declare module ParallaxSprite {
  export type LayersConfig = LayerConfig[];

  export type LayerConfig = {
    key: string;
  };

  export type Layer = {
    tileSprite: Phaser.GameObjects.TileSprite;
    scrollFactor: number;
  }
}