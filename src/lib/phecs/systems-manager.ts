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

  registerSystems(systemsList: Phecs.SystemConstructor[]) {
    systemsList.forEach((klass) => {
      this.registerSystem(new klass(this.scene));
    });
  }

  registerSystem(system: Phecs.System) {
    this.systems.push(system);
  };

  update(entityManager: EntityManager) {
   this.systems.forEach(system => {
     if (system.update) {
       system.update(entityManager);
     }
   });
  }
}
