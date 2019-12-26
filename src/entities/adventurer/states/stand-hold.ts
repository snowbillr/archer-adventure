import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerStandHold: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseIdle, {
  id: 'adventurer-stand-hold',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-stand-hold', true);
  },
  onUpdate(entity) {
    entity.getComponent(ShootsArrowsComponent).shotPower += entity.getComponent(ShootsArrowsComponent).shotChargeRate;
  },
  transitions: [
    {
      type: TransitionType.ReleaseControl,
      control: 'shoot',
      to: 'adventurer-stand-shoot',
    },
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-stand-hold',
      onTransition: (entity) => {
        entity.getComponent(SpriteComponent).sprite.flipX = true;
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-stand-hold',
      onTransition: (entity) => {
        entity.getComponent(SpriteComponent).sprite.flipX = false;
      }
    }
  ]
});
