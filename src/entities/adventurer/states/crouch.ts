import { baseIdle } from './base-idle';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

export const adventurerCrouch: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseIdle, {
  id: 'adventurer-crouch',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-crouch');
  },
  transitions: [
    {
      type: TransitionType.ReleaseControl,
      control: 'down',
      to: (entity: Phecs.Entity) => {
        const controls = (entity.getComponent(SceneComponent).scene as BaseScene).controls;

        if (controls.left.isPressed) {
          return 'adventurer-run';
        } else if (controls.right.isPressed) {
          return 'adventurer-run';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-roll',
      onTransition: adventurer => {
        adventurer.getComponent(SpriteComponent).sprite.flipX = true;
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-roll',
      onTransition: adventurer => {
        adventurer.getComponent(SpriteComponent).sprite.flipX = false;
      }
    }
  ]
});
