import { SpriteComponent } from '../../../components/sprite-component';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-idle',
  onEnter(enemy) {
    enemy.components[SpriteComponent.tag].sprite.anims.play('enemy-idle');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(enemy) {
        return Math.random() < 0.02;
      },
      to: 'enemy-jump',
    }
  ],
}
