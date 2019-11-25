import { BaseScene } from '../scenes/base-scene';

export class ComponentManagerPlugin extends Phaser.Plugins.ScenePlugin {
  private components: { [tag: string]: Phecs.ComponentConstructor };

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.components = {};
  }

  registerComponents(componentsList: {klass: Phecs.ComponentConstructor, tag: string}[]) {
    componentsList.forEach(({ klass, tag}) => this.components[tag] = klass);
  }

  getComponent(tag: string): Phecs.ComponentConstructor {
    return this.components[tag];
  }
}
