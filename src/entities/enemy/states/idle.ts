import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-idle',
  onEnter(enemy) {
    enemy.components[SpriteComponent.tag].sprite.anims.play('enemy-idle');
  },
  transitions: [
    {
      type: TransitionType.Timer,
      delay: 1500,
      to: 'enemy-jump',
   }
  ],
}
