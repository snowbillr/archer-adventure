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

  removeSystems(systemsList: Phecs.SystemConstructor[]) {
    const systemsToRemove = this.systems.filter(system => systemsList.some(klass => system instanceof klass));

    systemsToRemove.forEach(system => {
      if (system.stop) system.stop(this.scene.phecs.phEntities);
      if (system.destroy) system.destroy();
    });

    this.systems = this.systems.filter(system => !systemsToRemove.includes(system));
  }
}
