import { BaseScene } from '../scenes/base-scene';

type EntityRegistrationData = {
  x: number,
  y: number,
  scale: number,
  [key: string]: any
};

interface Component {
  [key: string]: any;
}

interface ComponentConstructor {
  new(scene: BaseScene, data: EntityRegistrationData): Component;
}

export class ComponentManagerPlugin extends Phaser.Plugins.ScenePlugin {
  private components: { [tag: string]: ComponentConstructor };

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.components = {};
  }

  registerComponents(componentsList: {klass: ComponentConstructor, tag: string}[]) {
    componentsList.forEach(({ klass, tag}) => this.components[tag] = klass);
  }

  getComponent(tag: string): ComponentConstructor {
    return this.components[tag];
  }
}
