import { movementAttributes } from '../movement-attributes';

import { baseAerial } from './base-aerial';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const baseFall: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseAerial, {
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-fall');
  },
  transitions: [
    {
      type: TransitionType.PressControl,
      control: 'shoot',
      to: 'adventurer-air-draw',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return entity.getComponent(PhysicsBodyComponent).body.blocked.down;
      },
      to(entity: Phecs.Entity) {
        const controls = entity.getComponent(AdventurerComponent).controls;

        if (controls.down.isDown) {
          if (Math.abs(entity.getComponent(PhysicsBodyComponent).body.velocity.x) < movementAttributes.slideVelocityThreshold) {
            return 'adventurer-crouch';
          } else {
            return 'adventurer-slide';
          }
        } else if (controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (controls.right.isDown) {
          return 'adventurer-run-right';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
