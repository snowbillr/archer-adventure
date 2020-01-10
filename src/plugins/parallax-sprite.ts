export class ParallaxSprite {
  private scene: Phaser.Scene;
  private layers: ParallaxSprite.Layer[];

  constructor(scene: Phaser.Scene, layersConfig: ParallaxSprite.LayersConfig, depth: number) {
    this.scene = scene;

    const x = scene.cameras.main.centerX;
    const y = scene.cameras.main.centerY;
    const width = scene.cameras.main.width;
    const height = scene.cameras.main.height;

    const layerCount = layersConfig.length;
    this.layers = layersConfig.map((layerConfig: ParallaxSprite.LayerConfig, index) => {
      const tileSprite = scene.add.tileSprite(x, y, width, height, layerConfig.key);
      tileSprite.setScrollFactor(0);
      tileSprite.setDepth(depth);

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

  destroy() {
    this.layers.forEach(layer => {
      layer.tileSprite.destroy();
    });
  }
}
