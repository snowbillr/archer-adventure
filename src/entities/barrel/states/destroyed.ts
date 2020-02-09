import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';

export const destroyed: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'barrel-destroyed',
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: barrel => {
        return !barrel.getComponent(SpriteComponent).sprite.anims.isPlaying;
      },
      to: 'barrel-disabled'
    }
  ],
  onEnter(barrel) {
    barrel.getComponent(SpriteComponent).sprite.anims.play('barrel-destroy');
  },
}
