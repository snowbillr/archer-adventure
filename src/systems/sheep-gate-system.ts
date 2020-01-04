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

    adventurer.getComponent(PhiniteStateMachineComponent).phiniteStateMachine.disable();

    /*
      `Actors` have methods that return `ScriptAction`s
      The `Showrunner` executes these actions while running the `Script`,
      and waits for them to finish before running the next one.
      `Script`s can be either `sequential` or `parallel`.
    */

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

    const adventurerActor = new AdventurerActor(this.scene, adventurer);
    const sheepActor = new SheepActor(this.scene, sheep);

    const script = new Script([
      sheepActor.disablePhSM(),
      adventurerActor.disablePhSM(),

      adventurerActor.walk(-100),

      sheepActor.enablePhSM(),
      adventurerActor.enablePhSM(),
    ]);
    const showrunner = new Showrunner(script);
    showrunner.run();
  }
}
