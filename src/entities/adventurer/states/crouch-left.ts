import { baseCrouch } from './base-crouch';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerCrouchLeft: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseCrouch, {
  id: 'adventurer-crouch-left',
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = true;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.right,
      to: 'adventurer-crouch-right'
    }
  ]
});
