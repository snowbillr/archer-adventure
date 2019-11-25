import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';

export const adventurerStand: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand',
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-stand');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.right,
      to: 'adventurer-run-right',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.left,
      to: 'adventurer-run-left',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.down,
      to: 'adventurer-crouch',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.up,
      to: 'adventurer-jump-prep',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.attack,
      to: 'adventurer-stand-draw'
    }
  ],
});
