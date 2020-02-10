import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

export const adventurerRun: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseGround, {
  id: 'adventurer-run',
  onEnter(entity: Phecs.Entity) {
    const sprite = entity.getComponent(SpriteComponent).sprite;
    const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;
    sprite.anims.play('adventurer-run');

    let direction: ("left" | "right") = "left";
    if (controls.left.isPressed && controls.right.isPressed) {
      if (controls.left.pressedAt! > controls.right.pressedAt!) {
        direction = "left";
      } else {
        direction = "right";
      }
    } else if (controls.left.isPressed) {
      direction = "left";
    } else {
      direction = "right";
    }

    startRunning(entity, direction);
  },
  transitions: [
    {
      type: TransitionType.ReleaseControl,
      control: 'right',
      to: adventurer => {
        if ((adventurer.getComponent(SceneComponent).scene as BaseScene).controls.left.isPressed) {
          return 'adventurer-run';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.ReleaseControl,
      control: 'left',
      to: adventurer => {
        if ((adventurer.getComponent(SceneComponent).scene as BaseScene).controls.right.isPressed) {
          return 'adventurer-run';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-run',
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-run',
    },
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
    entity.getComponent(SpriteComponent).sprite.flipX = true;
    entity.getComponent(PhysicsBodyComponent).body.acceleration.x = -movementAttributes.horizontalAcceleration;
  } else if (direction === "right") {
    entity.getComponent(SpriteComponent).sprite.flipX = false;
    entity.getComponent(PhysicsBodyComponent).body.acceleration.x = movementAttributes.horizontalAcceleration;
  }

  boostTurnaroundVelocity(entity);
}


function boostTurnaroundVelocity(entity: Phecs.Entity) {
  if (!Phaser.Math.Within(entity.getComponent(PhysicsBodyComponent).body.velocity.x, 0, 5)) {
    entity.getComponent(PhysicsBodyComponent).body.velocity.x += entity.getComponent(PhysicsBodyComponent).body.velocity.x * 0.5 * -1;
  }
}
