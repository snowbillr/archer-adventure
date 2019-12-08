import { baseIdle } from './base-idle';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const baseCrouch: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseIdle, {
  onEnter(entity: Phecs.Entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-crouch');
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.getComponent(AdventurerComponent).codes.down,
      to: (entity: Phecs.Entity) => {
        const controls = entity.getComponent(AdventurerComponent).controls;

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
