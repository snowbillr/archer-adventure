import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

function decelerate(entity: Phecs.Entity) {
  entity.getComponent(PhysicsBodyComponent).body.acceleration.x = entity.getComponent(PhysicsBodyComponent).body.velocity.x < 0 ? movementAttributes.horizontalDeceleration : -movementAttributes.horizontalDeceleration;
}

function haltMovementWithinThreshold(entity: Phecs.Entity) {
  if (Phaser.Math.Within(entity.getComponent(PhysicsBodyComponent).body.velocity.x, 0, 100)) {
    entity.getComponent(PhysicsBodyComponent).body.acceleration.x = 0;
    entity.getComponent(PhysicsBodyComponent).body.velocity.x = 0;
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
