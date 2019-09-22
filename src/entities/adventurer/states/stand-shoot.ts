import { baseIdle } from './base-idle';
import { StateMerge } from '../../../lib/phinite-state-machine/state-merge';
import { TransitionType } from '../../../lib/phinite-state-machine/transition-type';
import { BaseScene } from '../../../scenes/base-scene';

export const adventurerStandShoot: PhiniteStateMachine.States.State<Entities.Adventurer> = StateMerge(baseIdle, {
  id: 'adventurer-stand-shoot',
  onEnter(entity: Entities.Adventurer) {
    entity.sprite.anims.play('adventurer-stand-shoot');
  },
  onLeave(entity) {
    const baseScene = entity.sprite.scene as BaseScene;
    const arrow = baseScene.entityManager.createPrefab('arrow', {}, 2, entity.sprite.depth, entity.sprite.x, entity.sprite.y, false);

    baseScene.physics.add.collider(arrow.sprite, baseScene.areaManager.getTileLayer('ground')!);
  },
  transitions: [
    {
      type: TransitionType.Conditional,
      condition(entity: Entities.Adventurer) {
        return !entity.sprite.anims.isPlaying;
      },
      to: 'adventurer-stand'
    },
  ]
});
