export class ParallaxSprite {
  private scene: Phaser.Scene;
  private layers: ParallaxSprite.Layer[];
  constructor(scene: Phaser.Scene, layersConfig: ParallaxSprite.LayersConfig, x: number, y: number, width: number, height: number) {
    this.scene = scene;
    x = x || scene.cameras.main.centerX;
    y = y || scene.cameras.main.centerY;
    width = width || scene.cameras.main.width;
    height = height || scene.cameras.main.height;
    const layerCount = layersConfig.length;
    this.layers = layersConfig.map((layerConfig: ParallaxSprite.LayerConfig, index) => {
      const tileSprite = scene.add.tileSprite(x, y, width, height, layerConfig.key);
      tileSprite.setScrollFactor(0);
      return {
        tileSprite,
        scrollFactor: ((index + 1) / layerCount) * 0.2,
      };
    });
  }
  scrollWithCamera(camera: Phaser.Cameras.Scene2D.Camera) {
    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, () => this.setOffset(camera.scrollX));
  }
  setOffset(offset: number) {
    this.layers.forEach(layer => {
      layer.tileSprite.setTilePosition(layer.scrollFactor * offset);
    });
  }
}
