import { ParallaxSprite } from "./parallax-sprite";

export class ParallaxSpritePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
      super(pluginManager);

      pluginManager.registerGameObject('parallaxSprite', this.createParallaxSprite);
  }

  createParallaxSprite(this: Phaser.GameObjects.GameObjectFactory, layersConfig: ParallaxSprite.LayersConfig, depth: number) {
    return new ParallaxSprite(this.scene, layersConfig, depth);
  }
}
