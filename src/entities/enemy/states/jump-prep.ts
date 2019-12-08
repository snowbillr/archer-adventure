import { SpriteComponent } from '../../../components/sprite-component';
import { SceneComponent } from '../../../components/scene-component';

import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const jumpPrep: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-jump-prep',
  onEnter(enemy) {
    const sprite = enemy.getComponent(SpriteComponent).sprite;
    const scene = enemy.getComponent(SceneComponent).scene;

    sprite.anims.stop();

    scene.tweens.timeline({
      tweens: [
        {
          targets: sprite,
          props: {
            scaleY: 0.8,
            scaleX: 1.2,
          },
          duration: 100,
          completeDelay: 100,
        },
        {
          targets: sprite,
          props: {
            scaleY: 1,
            scaleX: 1,
          },
          duration: 100,
        }
      ]
    });
  },
  transitions: [
   {
     type: TransitionType.Timer,
     delay: 300,
     to: 'enemy-jump',
   }
  ],
}
