import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const hit: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'arrow-hit',
  transitions: [],
  onEnter(arrow) {
    arrow.components[PhysicsBodyComponent.tag].body.setVelocity(0, 0);
    arrow.components[PhysicsBodyComponent.tag].body.allowGravity = false;
  }
}
