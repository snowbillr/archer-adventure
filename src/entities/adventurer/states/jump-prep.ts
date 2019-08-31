import { movementAttributes } from '../movement-attributes';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerJumpPrep: PhiniteStateMachine.States.State<Entities.Adventurer> = {
  id: 'adventurer-jump-prep',
  onEnter(entity: Entities.Adventurer) {
    entity.body.acceleration.x = 0;

    entity.sprite.anims.play('adventurer-jump-prep');
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Entities.Adventurer) => {
        return !entity.sprite.anims.isPlaying;
      },
      to: (entity: Entities.Adventurer) => {
        if (entity.controls.right.isDown) {
          return 'adventurer-jump-right';
        } else if (entity.controls.left.isDown) {
          return 'adventurer-jump-left';
        } else if (entity.body.velocity.x > 0) {
          return 'adventurer-jump-right';
        } else if (entity.body.velocity.x < 0) {
          return 'adventurer-jump-left';
        } else {
          return 'adventurer-jump';
        }
      },
      onTransition: (entity: Entities.Adventurer) => {
        entity.body.velocity.y = movementAttributes.jumpVelocity;
      },
    }
  ]
}
