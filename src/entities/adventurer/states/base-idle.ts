import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';

function decelerate(entity: Entities.Adventurer) {
  entity.body.acceleration.x = entity.body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
}

function haltMovementWithinThreshold(entity: Entities.Adventurer) {
  if (Phaser.Math.Within(entity.body.velocity.x, 0, 100)) {
    entity.body.acceleration.x = 0;
    entity.body.velocity.x = 0;
  }
}

export const baseIdle: Partial<PhiniteStateMachine.States.State<Entities.Adventurer>> = StateMerge<Entities.Adventurer>(baseGround, {
  onEnter(entity: Entities.Adventurer) {
    decelerate(entity);
  },
  onUpdate(entity: Entities.Adventurer) {
    haltMovementWithinThreshold(entity);
  },
});
