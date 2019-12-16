import { SpriteComponent } from "../../../components/sprite-component";

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'old-lady-idle',
  onEnter(oldLady: Phecs.Entity) {
    oldLady.getComponent(SpriteComponent).sprite.anims.play('old-lady-idle');
  },
  transitions: []
};
