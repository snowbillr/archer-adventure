import { movementAttributes } from '../movement-attributes';
import { baseGround } from './base-ground';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';

export const adventurerSlide: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge(baseGround, {
  id: 'adventurer-slide',
  onEnter(adventurer: Phecs.Entity) {
    adventurer.components[SpriteComponent.tag].sprite.anims.play('adventurer-slide')

    if (adventurer.components[PhysicsBodyComponent.tag].body.velocity.x > 0) {
      adventurer.components[PhysicsBodyComponent.tag].body.acceleration.x = -1 * movementAttributes.slideDeceleration;
    } else {
      adventurer.components[PhysicsBodyComponent.tag].body.acceleration.x = movementAttributes.slideDeceleration;
    }
  },
  onUpdate(entity: Phecs.Entity) {
    if(Phaser.Math.Within(entity.components[PhysicsBodyComponent.tag].body.velocity.x, 0, 5)) {
      entity.components[PhysicsBodyComponent.tag].body.acceleration.x = 0;
    }
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition: (entity: Phecs.Entity) => {
        return !entity.components[SpriteComponent.tag].sprite.anims.isPlaying;
      },
      to: (entity: Phecs.Entity) => {
        const controls = entity.components[AdventurerComponent.tag].controls;

        if (controls.left.isDown) {
          return 'adventurer-run-left';
        } else if (controls.right.isDown) {
          return 'adventurer-run-right';
        } else if (controls.down.isDown) {
          return 'adventurer-crouch';
        } else {
          return 'adventurer-stand';
        }
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.up,
      to: 'adventurer-jump-prep',
    }
  ],
});
