import { baseAerial } from './base-aerial';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { PhysicsBodyComponent } from '../../../components/physics-body-component';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerAirDraw: PhiniteStateMachine.States.State<Phecs.Entity> = StateMerge<Phecs.Entity>(baseAerial, {
  id: 'adventurer-air-draw',
  onEnter(entity) {
    entity.getComponent(SpriteComponent).sprite.anims.play('adventurer-air-draw', true);
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
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.getComponent(AdventurerComponent).codes.attack,
      to: 'adventurer-air-shoot',
    },
    {
      type: TransitionType.Conditional,
      condition(entity) {
        return !entity.getComponent(SpriteComponent).sprite.anims.isPlaying;
      },
      to: 'adventurer-air-hold'
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.left,
      to: 'adventurer-air-draw',
      onTransition(entity) {
        entity.getComponent(SpriteComponent).sprite.flipX = true;
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.getComponent(AdventurerComponent).codes.right,
      to: 'adventurer-air-draw',
      onTransition(entity) {
        entity.getComponent(SpriteComponent).sprite.flipX = false;
      }
    }
  ]
});
