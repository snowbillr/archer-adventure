import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { BaseScene } from '../../../scenes/base-scene';

export const adventurerStandShoot: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-shoot',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-stand-shoot');
  },
  onLeave(entity) {
    entity.shootArrow(entity.sprite.x, entity.sprite.y, entity.sprite.depth);
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.sprite.anims.isPlaying;
      },
      to: 'adventurer-stand'
    },
  ]
});
