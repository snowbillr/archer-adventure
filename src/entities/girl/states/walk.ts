import { SpriteComponent } from "../../../components/sprite-component";

export const walk: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'girl-walk',
  onEnter(girl: Phecs.Entity) {
    girl.getComponent(SpriteComponent).sprite.anims.play('girl-walk');
  },
  transitions: []
};
