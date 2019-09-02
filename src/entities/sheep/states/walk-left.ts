import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const walkLeft: PhiniteStateMachine.States.State<Entities.Sheep> = {
  id: 'sheep-walk-left',
  onEnter(sheep: Entities.Sheep) {
    sheep.sprite.anims.play('sheep-walk');
    sheep.sprite.flipX = true;

    sheep.body.velocity.x = -50;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(sheep: Entities.Sheep) {
        return sheep.sprite.x < 1850;
      },
      to: 'sheep-walk-right'
    }
  ]
}
