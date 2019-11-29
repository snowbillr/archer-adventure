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
    this.phEntities.start(this.phEntities);
    this.phComponents.start(this.phEntities);
    this.phSystems.start(this.phEntities);
  }

  stop() {
    this.phEntities.stop(this.phEntities);
    this.phComponents.stop(this.phEntities);
    this.phSystems.stop(this.phEntities);
  }

  update() {
    this.phEntities.update(this.phEntities);
    this.phComponents.update(this.phEntities);
    this.phSystems.update(this.phEntities);
  }

  destroy() {
    this.phEntities.destroy();
    this.phComponents.destroy();
    this.phEntities.destroy();
  }
}
