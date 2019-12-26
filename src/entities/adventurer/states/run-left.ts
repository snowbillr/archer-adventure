import { baseRun, startRunning } from './base-run';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerRunLeft: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseRun, {
  id: 'adventurer-run-left',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = true;
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-run');

    startRunning(entity, "left");
  },
  transitions: [
    {
      type: TransitionType.ReleaseControl,
      control: 'left',
      to: 'adventurer-stand',
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-run-right',
    },
  ]
});
