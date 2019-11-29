import { PhiniteStateMachine } from '../lib/phinite-state-machine/phinite-state-machine';
import { BaseScene } from '../scenes/base-scene';
import { TransitionType } from '../lib/phinite-state-machine/transition-type';

export class PhiniteStateMachineComponent implements Phecs.Component {
  public static tag: string = 'phinite-state-machine';

  public phiniteStateMachine: PhiniteStateMachine<Phecs.Entity>;

  constructor(scene: Phaser.Scene, data: Phecs.EntityData, entity: Phecs.Entity) {
    const baseScene = scene as BaseScene;

    const states = baseScene.stateRegistrar.getSet(data.stateSet);
    const initialState = baseScene.stateRegistrar.getState(data.initialStateId);

    this.phiniteStateMachine = new PhiniteStateMachine<any>(scene, entity, states);

    this.phiniteStateMachine.doTransition({
      type: TransitionType.Initial,
      to: initialState.id,
    });
  }

  destroy() {
    this.phiniteStateMachine.destroy();

    delete this.phiniteStateMachine;
  }
}
