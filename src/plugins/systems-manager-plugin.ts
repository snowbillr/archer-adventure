import 'phaser';

export class SystemsManagerPlugin extends Phaser.Plugins.ScenePlugin implements SystemsManager.SystemsManager {
  private entityMap: { [tag: string]: SystemsManager.Entity[] };
  private systemsMap: { [tag: string]: SystemsManager.System[] };

  constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
    super(scene, pluginManager);

    this.entityMap = {};
    this.systemsMap = {};

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
  }

  start() {
    Object.values(this.systemsMap)
      .flat()
      .filter((system, index, list) => {
        return list.indexOf(system) === index;
      })
      .forEach(system => {
        system.start && system.start(this);
      });
  }

  stop() {
    Object.values(this.systemsMap)
      .flat()
      .filter((system, index, list) => {
        return list.indexOf(system) === index;
      })
      .forEach(system => {
        system.stop && system.stop(this);
      })
  }

  destroyEntities() {
    Object.entries(this.entityMap).forEach(([tag, entities]) => {
      const systems = this.systemsMap[tag];
      systems.forEach(system => {
        entities.forEach(entity => {
          if (system.destroy) {
            system.destroy(entity, tag);
          }
        });
      });
    });

    this.entityMap = {};
  }

  registerSystems(systemsList: {klass: SystemsManager.SystemConstructor, tags: (string | string[])}[]) {
    systemsList.forEach(({ klass, tags }) => {
      this.registerSystem(new klass(this.scene), tags);
    });
  }

  registerSystem(system: SystemsManager.System, tags: (string | string[])) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.systemsMap[tag] = this.systemsMap[tag] || [];
      this.systemsMap[tag].push(system);
    });
  };

  registerEntity(entity: SystemsManager.Entity, tags: (string | string[]), data: SystemsManager.EntityRegistrationData) {
    entity.id = this.uuid();

    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.entityMap[tag] = this.entityMap[tag] || [];
      this.entityMap[tag].push(entity);

      this.systemsMap[tag] = this.systemsMap[tag] || [];
      this.systemsMap[tag].forEach(system => system.registerEntity && system.registerEntity(entity, data, tag));
    });
  }

  getEntities<T extends SystemsManager.Entity>(tag: string) {
    return (this.entityMap[tag] || []) as T[];
  }

  update() {
    Object.entries(this.systemsMap).forEach(([tag, systems]) => {
      systems.forEach(system => system.update && system.update(this));
    });
  }

  private uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
