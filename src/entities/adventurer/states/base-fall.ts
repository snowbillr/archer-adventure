import { movementAttributes } from '../movement-attributes';

import { baseAerial } from './base-aerial';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';

export const baseFall: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseAerial, {
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-fall');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.codes.attack,
      to: 'adventurer-air-draw',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return entity.body.blocked.down;
      },
      to(entity: Entities.Adventurer) {
        if (entity.controls.down.isDown) {
          if (Math.abs(entity.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (entity.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (entity.controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
