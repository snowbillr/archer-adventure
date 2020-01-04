import { BaseInteractionSystem } from './base-systems/base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';

export class SheepGateSystem extends BaseInteractionSystem {
  constructor(scene: Phaser.Scene) {
    super(scene, AdventurerComponent, 'sheep');
  }

  onEnter(adventurer: Phecs.Entity, sheep: Phecs.Entity) {
    if (this.scene.persistence.progression.conversations.isCompleted({
      type: "conversation",
      name: "oldMan",
      index: 0
    })) {
      return;
    }

    adventurer.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.disable();

    /*
    const adventurerActor = new AdventurerActor(adventurer);
    const sheepActor = new NpcActor(sheep);
    const script = new Script([
      adventurerActor.disablePhSM(),
      sheepActor.disablePhSM(),
      sheepActor.faceActor(adventurerActor),
      sheepActor.say('BAAAAH'),
      adventurerActor.walk(-30),
      adventurerActor.faceActor(sheepActor),
      adventurerActor.enablePhSM(),
      sheepActor.enablePhSM(),
    ]);

    new Showrunner(script).run();
    */
  }
}
