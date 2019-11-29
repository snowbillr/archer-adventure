import { baseRun, startRunning } from './base-run';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerRunRight: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseRun, {
  id: 'adventurer-run-right',
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.flipX = false;
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-run');

    startRunning(entity, "right");
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.components[AdventurerComponent.tag].codes.right,
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.left,
      to: 'adventurer-run-left',
    },
  ]
});
