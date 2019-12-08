import { PhysicsBodyComponent } from '../../../components/physics-body-component';

export const hit: PhiniteStateMachine.States.State<Phecs.Entity> = {
  id: 'arrow-hit',
  transitions: [],
  onEnter(arrow) {
    arrow.getComponent(PhysicsBodyComponent).body.setVelocity(0, 0);
    arrow.getComponent(PhysicsBodyComponent).body.allowGravity = false;
  }
}
