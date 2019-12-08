import { SpriteComponent } from "../../components/sprite-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { ZoneBoundaryComponent } from "../../components/zone-boundary-component";

export const sheepPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'sheep-walk',
        frame: 0,
        depth: 0,
      }
    },
    PhysicsBodyComponent,
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: 'sheep',
        initialStateId: 'sheep-walk-right',
      }
    },
    {
      component: ZoneBoundaryComponent,
      data: {
        zoneBoundaryName: 'sheepBounds',
      }
    }
  ]
};
