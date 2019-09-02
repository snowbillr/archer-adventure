import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const walkRight: PhiniteStateMachine.States.State<Entities.Sheep> = {
  id: 'sheep-walk-right',
  onEnter(sheep: Entities.Sheep) {
    sheep.sprite.anims.play('sheep-walk');
    sheep.sprite.flipX = false;

    sheep.body.velocity.x = 50;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(sheep: Entities.Sheep) {
        return sheep.sprite.x > 2100;
      },
      to: 'sheep-walk-left'
    }
  ]
}
