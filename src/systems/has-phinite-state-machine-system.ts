import 'phaser';

import { BaseSystem } from '../lib/base-system';
import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';

export class HasPhiniteStateMachineSystem<T extends Systems.HasPhiniteStateMachine.Entity> extends BaseSystem<T> implements SystemsManager.System {
  static SystemTags = {
    hasPhiniteStateMachineSystem: 'hasPhiniteStateMachineSystem',
  };

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(HasPhiniteStateMachineSystem.SystemTags.hasPhiniteStateMachineSystem, '');

    this.scene = scene;
  }

  registerEntity(entity: T, data: SystemsManager.EntityRegistrationData): void {
    const { states, initialState } = data;
    const phiniteStateMachine = new PhiniteStateMachine(this.scene, entity, states);

    phiniteStateMachine.doTransition({
      type: TransitionType.Initial,
      to: initialState.id,
    });

    entity.phiniteStateMachine = phiniteStateMachine;
  }

  update(tagManager: SystemsManager.SystemsManager) {
    super.update(tagManager);

    const entities = this.tag1s;
    entities.forEach(entity => {
      entity.phiniteStateMachine.update();
    });
  }
}
