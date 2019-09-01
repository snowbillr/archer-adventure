import 'phaser';

import { BaseSystem } from '../lib/systems/base-system';
import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';
import { StateRegistrar } from '../lib/phinite-state-machine/state-registrar';

export class HasPhiniteStateMachineSystem<T extends Systems.HasPhiniteStateMachine.Entity<T>> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasPhiniteStateMachine: 'hasPhiniteStateMachine',
  };

  private scene: Phaser.Scene;
  private stateRegistrar: StateRegistrar;

  constructor(scene: Phaser.Scene, stateRegistrar: StateRegistrar) {
    super(HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachine, '');

    this.scene = scene;
    this.stateRegistrar = stateRegistrar;
  }

  registerEntity<U extends T>(entity: U, data: SystemsManager.EntityRegistrationData): void {
    const states = this.stateRegistrar.getSet(data.setId);
    const initialState = this.stateRegistrar.getState(data.initialStateId);

    const phiniteStateMachine = new PhiniteStateMachine<U>(this.scene, entity, states);

    phiniteStateMachine.doTransition({
      type: TransitionType.Initial,
      to: initialState.id,
    });

    entity.phiniteStateMachine = phiniteStateMachine;
  }

  update(tagManager: SystemsManager.SystemsManager) {
    super.update(tagManager);

    const entities = this.entity1s;
    entities.forEach(entity => {
      entity.phiniteStateMachine.update();
    });
  }
}
