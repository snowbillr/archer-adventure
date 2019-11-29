import { baseJump } from './base-jump';
import { movementAttributes } from '../movement-attributes';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerJumpRight: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseJump, {
  id: 'adventurer-jump-right',
  data: {
    targetAerialHorizontalVelocity: movementAttributes.aerialMaxHorizontalVelocity,
  },
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.flipX = false;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.left,
      to: 'adventurer-jump-left',
    },
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return entity.components[PhysicsBodyComponent.tag].body.velocity.y > 0;
      },
      to: 'adventurer-fall-right',
    }
  ]
});
