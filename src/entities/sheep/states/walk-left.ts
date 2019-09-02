export const walkLeft: PhiniteStateMachine.States.State<Entities.Sheep> = {
  id: 'sheep-walk-left',
  onEnter(sheep: Entities.Sheep) {
    sheep.sprite.anims.play('sheep-walk');
    sheep.sprite.flipX = true;
  },
  transitions: []
}
