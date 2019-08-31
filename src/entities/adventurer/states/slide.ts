import { movementAttributes } from '../movement-attributes';
import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerSlide: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseGround, {
  id: 'adventurer-slide',
  onEnter(adventurer: Entities.Adventurer) {
    adventurer.sprite.anims.play('adventurer-slide')

    if (adventurer.body.velocity.x > 0) {
      adventurer.body.acceleration.x = -1 * movementAttributes.slideDeceleration;
    } else {
      adventurer.body.acceleration.x = movementAttributes.slideDeceleration;
    }
  },
  onUpdate(entity: Entities.Adventurer) {
    if(Phaser.Math.Within(entity.body.velocity.x, 0, 5)) {
      entity.body.acceleration.x = 0;
    }
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return !entity.sprite.anims.isPlaying;
      },
      to: (entity: Entities.Adventurer) => {
        if (entity.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (entity.controls.right.isDown) {
          return 'adventurer-run-right';
        } else if (entity.controls.down.isDown) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: 'ArrowUp',
      to: 'adventurer-jump-prep',
    }
  ],
});
