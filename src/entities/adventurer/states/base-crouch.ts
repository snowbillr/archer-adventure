import { baseIdle } from './base-idle';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { SceneComponent } from '../../../components/scene-component';
import { BaseScene } from '../../../scenes/base-scene';

export const baseCrouch: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseIdle, {
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
          return 'adventurer-run-left';
        } else if (controls.right.isPressed) {
          return 'adventurer-run-right';
        } else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
