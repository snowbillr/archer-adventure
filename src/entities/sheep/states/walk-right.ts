export const walkRight: PhiniteStateMachine.States.State<Entities.Sheep> = {
  id: 'sheep-walk-right',
  onEnter(sheep: Entities.Sheep) {
    sheep.sprite.anims.play('sheep-walk');
  },
  transitions: []
}
