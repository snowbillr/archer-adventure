import { BaseInteractionSystem } from './base-systems/base-interaction-system';
import { AdventurerComponent } from '../components/adventurer-component';

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

    /*
    new Showrunner()
      .actor('adventurer', new AdventurerActor(adventurer))
      .actor('sheep', new NpcActor(sheep))
      .script([
        {
          actor: 'sheep',
          action: 'conversation',
          data: {
            sentence: 'BAAAAH!'
          }
        },
        {
          actor: 'adventurer',
          action: 'walk',
          data: {
            x: '-= 30'
          }
        }
      ])
      .run();
    */
  }
}
