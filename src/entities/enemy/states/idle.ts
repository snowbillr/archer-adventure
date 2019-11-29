import { SpriteComponent } from '../../../components/sprite-component';

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'enemy-idle',
  onEnter(enemy) {
    enemy.components[SpriteComponent.tag].sprite.anims.play('enemy-idle');
  },
  transitions: [],
}
