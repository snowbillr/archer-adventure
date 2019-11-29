import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

function decelerate(entity: Phecs.Entity) {
  entity.components[PhysicsBodyComponent.tag].body.acceleration.x = entity.components[PhysicsBodyComponent.tag].body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
}

function haltMovementWithinThreshold(entity: Phecs.Entity) {
  if (Phaser.Math.Within(entity.components[PhysicsBodyComponent.tag].body.velocity.x, 0, 100)) {
    entity.components[PhysicsBodyComponent.tag].body.acceleration.x = 0;
    entity.components[PhysicsBodyComponent.tag].body.velocity.x = 0;
  }
}

export const baseIdle: Partial<PhiniteStateMachine.States.State<Phecs.Entity>> = StateMerge<Phecs.Entity>(baseGround, {
  onEnter(entity: Phecs.Entity) {
    decelerate(entity);
  },
  onUpdate(entity: Phecs.Entity) {
    haltMovementWithinThreshold(entity);
  },
});
