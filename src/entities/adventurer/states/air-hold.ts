import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerAirHold: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge<Phecs.Entity>(baseAerial, {
  id: 'adventurer-air-hold',
  onEnter(entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-air-hold', true);
  },
  onUpdate(entity) {
    entity.getComponent(ShootsArrowsComponent).shotPower += entity.getComponent(ShootsArrowsComponent).shotChargeRate;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity) {
        return entity.getComponent(PhysicsBodyComponent).body.blocked.down;
      },
      to: 'adventurer-stand-hold',
    },
    {
      type: TransitionType.ReleaseControl,
      control: 'shoot',
      to: 'adventurer-air-shoot',
    },
    {
      type: TransitionType.PressControl,
      control: 'left',
      to: 'adventurer-air-hold',
      onTransition(entity) {
        entity.getComponent(SpriteComponent).sprite.flipX = true;
      }
    },
    {
      type: TransitionType.PressControl,
      control: 'right',
      to: 'adventurer-air-hold',
      onTransition(entity) {
        entity.getComponent(SpriteComponent).sprite.flipX = false;
      }
    }
  ]
});
