import { movementAttributes } from '../movement-attributes';

import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const baseRun: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseGround, {
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.flipX = false;
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-run');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.attack,
      to: 'adventurer-stand-draw',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.down,
      to: (entity: Entities.Adventurer) => {
        if (Math.abs(entity.components[PhysicsBodyComponent.tag].body.velocity.x) < movementAttributes.slideVelocityThreshold) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-slide';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.up,
      to: 'adventurer-jump-prep',
    }
  ]
});

export function startRunning(entity: Entities.Adventurer, direction: "left" | "right") {
  if (direction === "left") {
    entity.components[PhysicsBodyComponent.tag].body.acceleration.x = -movementAttributes.horizontalAcceleration;
  } else if (direction === "right") {
    entity.components[PhysicsBodyComponent.tag].body.acceleration.x = movementAttributes.horizontalAcceleration;
  }

  boostTurnaroundVelocity(entity);
}


function boostTurnaroundVelocity(entity: Entities.Adventurer) {
  if (!Phaser.Math.Within(entity.components[PhysicsBodyComponent.tag].body.velocity.x, 0, 5)) {
    entity.components[PhysicsBodyComponent.tag].body.velocity.x += entity.components[PhysicsBodyComponent.tag].body.velocity.x * 0.5 * -1;
  }
}
