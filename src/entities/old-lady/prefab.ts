import { SpriteComponent } from "../../components/sprite-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";

export const oldLadyPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'old-lady',
      }
    },
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: 'old-lady',
        initialStateId: 'old-lady-idle'
      }
    }
  ]
};