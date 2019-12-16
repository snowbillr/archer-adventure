import { SpriteComponent } from "../../components/sprite-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";

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
    },
    {
      component: InteractionCircleComponent,
      data: {
        interactionRadius: 70,
        interactionDebug: false,
      }
    },
    SpriteIndicatorComponent,
  ]
};