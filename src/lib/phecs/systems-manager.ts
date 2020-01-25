import 'phaser';
import { BaseScene } from '../../scenes/base-scene';
import { EntityManager } from './entity-manager';

export class SystemsManager {
  private scene: BaseScene;

  private systems: Phecs.System[];

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;

    this.systems = [];
  }

  start(entityManager: EntityManager) {
    this.systems.forEach(system => {
      if (system.start) {
        system.start(entityManager);
      }
    })
  }

  stop(entityManager: EntityManager) {
    this.systems.forEach(system => {
      if (system.stop) {
        system.stop(entityManager);
      }
    })
  }

  update(entityManager: EntityManager) {
    this.systems.forEach(system => {
      if (system.update) {
        system.update(entityManager);
      }
    });
  }

  destroy() {
    this.systems.forEach(system => {
      if (system.destroy) {
        system.destroy();
      }
    });
    
    this.systems = [];
  }

  registerSystems(systemsList: Phecs.SystemConstructor[]) {
    systemsList.forEach((klass) => {
      this.systems.push(new klass(this.scene));
    });
  }

  unregisterSystems(systemsList: Phecs.SystemConstructor[]) {
    systemsList.forEach((klass) => {
      const systemInstance = this.systems.find(system => system instanceof klass);
      if (systemInstance) {
        if (systemInstance.stop) systemInstance.stop(this.scene.phecs.phEntities);
        if (systemInstance.destroy) systemInstance.destroy();
      } else {
        throw new Error(`SYSTEMS_MANAGER::UNREGISTER_SYSTEM::NO_SYSTEM_FOUND::${klass}`);
      }
    });
  }
}
