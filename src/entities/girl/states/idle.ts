import { SpriteComponent } from "../../../components/sprite-component";

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'girl-idle',
  onEnter(girl: Phecs.Entity) {
    girl.getComponent(SpriteComponent).sprite.anims.play('girl-idle');
  },
  transitions: []
};
