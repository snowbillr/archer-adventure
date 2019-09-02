import 'phaser';

export class SystemsManagerPlugin extends Phaser.Plugins.ScenePlugin implements SystemsManager.SystemsManager {
  private entityMap: { [tag: string]: any[] };
  private systemsMap: { [tag: string]: SystemsManager.System[] };

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.entityMap = {};
    this.systemsMap = {};
  }

  registerSystem(system: SystemsManager.System, tags: (string | string[])) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.systemsMap[tag] = this.systemsMap[tag] || [];
      this.systemsMap[tag].push(system);
    });
  };

  registerEntity(entity: any, tags: (string | string[]), data: SystemsManager.EntityRegistrationData) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.entityMap[tag] = this.entityMap[tag] || [];
      this.entityMap[tag].push(entity);

      this.systemsMap[tag] = this.systemsMap[tag] || [];
      this.systemsMap[tag].forEach(system => system.registerEntity && system.registerEntity(entity, data));
    });
  }

  getEntities(tag: string) {
    return this.entityMap[tag] || [];
  }

  update() {
    Object.entries(this.systemsMap).forEach(([tag, systems]) => {
      systems.forEach(system => system.update && system.update(this));
    });
  }
}
