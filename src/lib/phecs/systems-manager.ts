import 'phaser';
import { BaseScene } from '../../scenes/base-scene';

export class SystemsManager {
  private scene: BaseScene;

  private entityMap: { [tag: string]: SystemsManager.Entity[] };
  private systems: SystemsManager.System[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;

    this.entityMap = {};
    this.systems = [];
  }

  start() {
    this.systems.forEach(system => {
      if (system.start) {
        system.start(this);
      }
    })
  }

  stop() {
    this.systems.forEach(system => {
      if (system.stop) {
        system.stop(this);
      }
    })
  }

  destroyEntities() {
    this.entityMap = {};
  }

  registerSystems(systemsList: SystemsManager.SystemConstructor[]) {
    systemsList.forEach((klass) => {
      this.registerSystem(new klass(this.scene));
    });
  }

  registerSystem(system: SystemsManager.System) {
    this.systems.push(system);
  };

  registerEntity(entity: SystemsManager.Entity, tags: (string | string[]), data: SystemsManager.EntityRegistrationData) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];

    normalizedTags.forEach(tag => {
      this.entityMap[tag] = this.entityMap[tag] || [];
      this.entityMap[tag].push(entity);
    });
  }

  getEntities<T extends SystemsManager.Entity>(tag: string) {
    return (this.entityMap[tag] || []) as T[];
  }

  update() {
   this.systems.forEach(system => {
     if (system.update) {
       system.update(this);
     }
   });
  }
}
