import { SpriteComponent } from "../../../components/sprite-component";

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'trainer-idle',
  onEnter(trainer: Phecs.Entity) {
    trainer.getComponent(SpriteComponent).sprite.anims.play('trainer-idle');
  },
  transitions: []
};
