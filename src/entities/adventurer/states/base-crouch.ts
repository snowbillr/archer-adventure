import { baseIdle } from './base-idle';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const baseCrouch: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-crouch');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.components[AdventurerComponent.tag].codes.down,
      to: (entity: Entities.Adventurer) => {
        const controls = entity.components[AdventurerComponent.tag].controls;

        if (controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (controls.right.isDown) {
          return 'adventurer-run-right';
        } else {
          return 'adventurer-stand';
        }
      }
    }
  ]
});
