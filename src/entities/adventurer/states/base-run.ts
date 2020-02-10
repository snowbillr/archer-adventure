import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const baseRun: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseGround, {
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = false;
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-run');
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'shoot',
      to: 'adventurer-stand-draw',
    },
    {
      type: TransitionType.PressControl,
      control: 'down',
      to: 'adventurer-roll',
    },
   {
     type: TransitionType.PressControl,
     control: 'up',
     to: 'adventurer-jump-prep'
   }
  ]
});

export function startRunning(entity: Phecs.Entity, direction: "left" | "right") {
  if (direction === "left") {
    entity.getComponent(PhysicsBodyComponent).body.acceleration.x = -movementAttributes.horizontalAcceleration;
  } else if (direction === "right") {
    entity.getComponent(PhysicsBodyComponent).body.acceleration.x = movementAttributes.horizontalAcceleration;
  }

  boostTurnaroundVelocity(entity);
}


function boostTurnaroundVelocity(entity: Phecs.Entity) {
  if (!Phaser.Math.Within(entity.getComponent(PhysicsBodyComponent).body.velocity.x, 0, 5)) {
    entity.getComponent(PhysicsBodyComponent).body.velocity.x += entity.getComponent(PhysicsBodyComponent).body.velocity.x * 0.5 * -1;
  }
}
