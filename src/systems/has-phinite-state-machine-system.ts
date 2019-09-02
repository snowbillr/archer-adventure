import 'phaser';

import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';
import { StateRegistrar } from '../lib/phinite-state-machine/state-registrar';

export class HasPhiniteStateMachineSystem implements SystemsManager.System {
  static SystemTags = {
    hasPhiniteStateMachine: 'hasPhiniteStateMachine',
  };

  private scene: Phaser.Scene;
  private stateRegistrar: StateRegistrar;

  constructor(scene: Phaser.Scene, stateRegistrar: StateRegistrar) {
    this.scene = scene;
    this.stateRegistrar = stateRegistrar;
  }

  registerEntity(entity: Systems.HasPhiniteStateMachine.Entity<any>, data: SystemsManager.EntityRegistrationData): void {
    const states = this.stateRegistrar.getSet(data.stateSet);
    const initialState = this.stateRegistrar.getState(data.initialStateId);

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
}
