import { EntityManager } from '../lib/phecs/entity-manager';
import { ComponentManager } from '../lib/phecs/component-manager';
import { SystemsManager } from '../lib/phecs/systems-manager';

export class PhecsPlugin extends Phaser.Plugins.ScenePlugin {
  public phEntities: EntityManager;
  public phComponents: ComponentManager;
  public phSystems: SystemsManager;

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.phEntities = new EntityManager(scene);
    this.phComponents = new ComponentManager();
    this.phSystems = new SystemsManager(scene);

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
  }

  start() {

  }

  stop() {
    this.phSystems.stop();
  }

  update() {
    this.phSystems.update(this.phEntities);
  }

  destroy() {
    this.phEntities.destroy();
  }
}
