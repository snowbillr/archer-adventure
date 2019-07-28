import { Adventurer } from '../index';
import { TransitionType } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

export const baseFall: Partial<PhiniteState.State<Adventurer>> = {
  onEnter(adventurer :Adventurer, data: PhiniteState.StateData) {
    adventurer.sprite.anims.play('adventurer-fall');

    if (adventurer.body.velocity.x < data.horizontalMaxVelocity) {
      adventurer.body.acceleration.x = movementAttributes.fallHorizontalAcceleration;
    } else if (adventurer.body.velocity.x > data.horizontalMaxVelocity) {
      adventurer.body.acceleration.x = -1 * movementAttributes.fallHorizontalAcceleration;
    }
  },
  onUpdate(adventurer :Adventurer, data: PhiniteState.StateData) {
    if (Phaser.Math.Within(data.horizontalMaxVelocity, adventurer.body.velocity.x, 5)) {
      adventurer.body.acceleration.x = 0;
      adventurer.body.velocity.x = data.horizontalMaxVelocity;
    }
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (adventurer: Adventurer) => {
        return Phaser.Math.Within(adventurer.body.velocity.y, 0, 5);
      },
      to(adventurer: Adventurer) {
        if (adventurer.controls.down.isDown) {
          if (Math.abs(adventurer.body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (adventurer.controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (adventurer.controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
}
