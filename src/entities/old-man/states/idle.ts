import { SpriteComponent } from "../../../components/sprite-component";

export const idle: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'old-man-idle',
  onEnter(oldMan: Phecs.Entity) {
    oldMan.getComponent(SpriteComponent).sprite.anims.play('old-man-idle');
  },
  transitions: []
};
