import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

function decelerate(entity: Entities.Adventurer) {
  entity.components[PhysicsBodyComponent.tag].body.acceleration.x = entity.components[PhysicsBodyComponent.tag].body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
}

function haltMovementWithinThreshold(entity: Entities.Adventurer) {
  if (Phaser.Math.Within(entity.components[PhysicsBodyComponent.tag].body.velocity.x, 0, 100)) {
    entity.components[PhysicsBodyComponent.tag].body.acceleration.x = 0;
    entity.components[PhysicsBodyComponent.tag].body.velocity.x = 0;
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
