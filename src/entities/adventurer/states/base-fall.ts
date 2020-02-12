import { movementAttributes } from '../movement-attributes';

import { baseAerial } from './base-aerial';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

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
        const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

        if (controls.down.isPressed) {
          if (Math.abs(entity.getComponent(PhysicsBodyComponent).body.velocity.x) > 0) {
            return 'adventurer-roll';
          } else {
            return 'adventurer-crouch';
          }
        } else if (controls.left.isPressed) {
          return 'adventurer-run';
        } else if (controls.right.isPressed) {
          return 'adventurer-run';
        }  else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
