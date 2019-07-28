import { Adventurer } from '..';
import { TransitionType } from '../../../components/phinite-state';
import { movementAttributes } from '../movement-attributes';

export const baseJump = {
  onEnter(adventurer: Adventurer, data: PhiniteState.StateData) {
    if (adventurer.body.velocity.x < data.horizontalMaxVelocity) {
      adventurer.body.acceleration.x = movementAttributes.fallHorizontalAcceleration;
    } else if (adventurer.body.velocity.x > data.horizontalMaxVelocity) {
      adventurer.body.acceleration.x = -1 * movementAttributes.fallHorizontalAcceleration;
    }

    adventurer.sprite.anims.play('adventurer-jump-rise');
  },
  onUpdate(adventurer :Adventurer, data: PhiniteState.StateData) {
    if (Phaser.Math.Within(data.horizontalMaxVelocity, adventurer.body.velocity.x, 5)) {
      adventurer.body.acceleration.x = 0;
      adventurer.body.velocity.x = data.horizontalMaxVelocity;
    }
  },
};
