import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerStandDraw: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-draw',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-stand-draw');
    entity.reclaimArrowIfRequired();
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.sprite.anims.isPlaying;
      },
      to: 'adventurer-stand-hold'
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.codes.attack,
      to: 'adventurer-stand-shoot',
    }
  ]
});
