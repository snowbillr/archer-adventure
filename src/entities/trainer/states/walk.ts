import { SpriteComponent } from "../../../components/sprite-component";

export const walk: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'trainer-walk',
  onEnter(trainer: Phecs.Entity) {
    trainer.getComponent(SpriteComponent).sprite.anims.play('trainer-walk');
  },
  transitions: []
};
