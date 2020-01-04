import { SpriteComponent } from "../../components/sprite-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { ZoneBoundaryComponent } from "../../components/zone-boundary-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";

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
    },
    {
      component: InteractionCircleComponent,
      data: {
        interactionRadius: 30,
        interactionDebug: true,
      }
    }
  ]
};
