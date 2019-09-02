import 'phaser';

import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';
import { BaseScene } from '../scenes/base-scene';

export class HasPhiniteStateMachineSystem implements SystemsManager.System {
  static SystemTags = {
    hasPhiniteStateMachine: 'hasPhiniteStateMachine',
  };

  private scene: BaseScene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene as BaseScene;
  }

  registerEntity(entity: Systems.HasPhiniteStateMachine.Entity<any>, data: SystemsManager.EntityRegistrationData): void {
    const states = this.scene.stateRegistrar.getSet(data.stateSet);
    const initialState = this.scene.stateRegistrar.getState(data.initialStateId);

    const phiniteStateMachine = new PhiniteStateMachine<any>(this.scene, entity, states);

    phiniteStateMachine.doTransition({
      type: TransitionType.Initial,
      to: initialState.id,
    });

    entity.phiniteStateMachine = phiniteStateMachine;
  }

  update(tagManager: SystemsManager.SystemsManager) {
    const entities: Systems.HasPhiniteStateMachine.Entity<any>[] = tagManager.getEntities(HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachine)

    entities.forEach(entity => {
      entity.phiniteStateMachine.update();
    });
  }

  destroy(entity: Systems.HasPhiniteStateMachine.Entity<any>) {
    entity.phiniteStateMachine.destroy();
  }
}
