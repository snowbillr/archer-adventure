import { BaseInteractionSystem } from './base-systems/base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';
import { PhiniteStateMachineComponent } from '../components/phinite-state-machine-component';
import { Script } from '../lib/showrunner/script';
import { Showrunner } from '../lib/showrunner/showrunner';
import { AdventurerActor } from '../actors/adventurer-actor';
import { SheepActor } from '../actors/sheep-actor';

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

    const adventurerActor = new AdventurerActor(this.scene, adventurer);
    const sheepActor = new SheepActor(this.scene, sheep);

    const script = new Script([
      sheepActor.disablePhSM(),
      adventurerActor.disablePhSM(),

      sheepActor.faceLeft(),
      sheepActor.shout('BAAAAH!'),

      adventurerActor.walk(-100),
      adventurerActor.faceRight(),

      sheepActor.enablePhSM(),
      adventurerActor.enablePhSM(),
    ]);
    new Showrunner(script).run();
    
  }
}
