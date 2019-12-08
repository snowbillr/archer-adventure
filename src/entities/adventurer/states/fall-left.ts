import { movementAttributes } from '../movement-attributes';

import { baseFall } from './base-fall';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerFallLeft: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseFall, {
  id: 'adventurer-fall-left',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity * -1,
  },
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.flipX = true;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.right,
      to: 'adventurer-fall-right',
    }
  ]
});
