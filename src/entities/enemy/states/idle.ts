export const idle: PhiniteStateMachine.States.State<Entities.Enemy> = {
  id: 'enemy-idle',
  onEnter(enemy) {
    enemy.sprite.anims.play('enemy-idle');
  },
  transitions: [],
}
