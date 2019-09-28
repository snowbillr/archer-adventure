import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';

export const adventurerStandHold: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-hold',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-stand-hold');
  },
  onUpdate(entity) {
    entity.shotPower += entity.shotChargeRate;
  },
  transitions: [
    {
      type: TransitionType.Input,
      event: Phaser.Input.Keyboard.Events.ANY_KEY_UP,
      key: entity => entity.codes.attack,
      to: 'adventurer-stand-shoot',
    }
  ]
});
