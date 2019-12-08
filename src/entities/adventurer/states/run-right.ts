import { baseRun, startRunning } from './base-run';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerRunRight: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseRun, {
  id: 'adventurer-run-right',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = false;
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-run');

    startRunning(entity, "right");
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.getComponent(AdventurerComponent).codes.right,
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.left,
      to: 'adventurer-run-left',
    },
  ]
});
