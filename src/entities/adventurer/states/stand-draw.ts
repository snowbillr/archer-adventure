import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { SpriteComponent } from '../../../components/sprite-component';
import { AdventurerComponent } from '../../../components/adventurer-component';
import { ShootsArrowsComponent } from '../../../components/shoots-arrows-component';

export const adventurerStandDraw: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-draw',
  onEnter(entity: Entities.Adventurer) {
    entity.components[SpriteComponent.tag].sprite.anims.play('adventurer-stand-draw', true);
  },
  onUpdate(entity) {
    entity.components[ShootsArrowsComponent.tag].shotPower += entity.components[ShootsArrowsComponent.tag].shotChargeRate;
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.components[SpriteComponent.tag].sprite.anims.isPlaying;
      },
      to: 'adventurer-stand-hold'
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.components[AdventurerComponent.tag].codes.attack,
      to: 'adventurer-stand-shoot',
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.left,
      to: 'adventurer-stand-draw',
      onTransition(entity) {
        entity.components[SpriteComponent.tag].sprite.flipX = true;
      }
    },
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_DOWN,
      key: entity => entity.components[AdventurerComponent.tag].codes.right,
      to: 'adventurer-stand-draw',
      onTransition(entity) {
        entity.components[SpriteComponent.tag].sprite.flipX = false;
      }
    }
  ]
});
