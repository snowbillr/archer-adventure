import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { movementAttributes } from '../movement-attributes';

export const adventurerAirShoot: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge<Entities.Adventurer>(baseAerial, {
  id: 'adventurer-air-shoot',
  onEnter(entity) {
    entity.sprite.anims.play('adventurer-air-shoot');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return entity.body.blocked.down;
      },
      to: 'adventurer-stand-shoot',
    },
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.sprite.anims.isPlaying;
      },
      to(entity) {
        if (entity.body.velocity.y < 0) {
          return 'adventurer-jump';
        } else {
          return 'adventurer-fall';
        }
      },
      onTransition(entity) {
        entity.shootArrow();
      }
    }
  ]
});
