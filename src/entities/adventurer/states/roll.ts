import { movementAttributes } from '../movement-attributes';
import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

export const adventurerRoll: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'adventurer-roll',
  onEnter(adventurer: Phecs.Entity) {
    adventurer.getComponent(SpriteComponent).sprite.anims.play('adventurer-roll')
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.getComponent(SpriteComponent).sprite.anims.isPlaying;
      },
      to: (entity: Phecs.Entity) => {
        const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

        if (controls.left.isPressed) {
          return 'adventurer-run';
        } else if (controls.right.isPressed) {
          return 'adventurer-run';
        } else if (controls.down.isPressed) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'up',
      to: 'adventurer-jump-prep',
    }
  ],
};
