import { SpriteComponent } from "../../components/sprite-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { ConversationBoxComponent } from "../../components/conversation-box-component";

export const oldManPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'old-man',
      }
    },
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: 'old-man',
        initialStateId: 'old-man-idle'
      }
    },
    {
      component: InteractionCircleComponent,
      data: {
        interactionRadius: 50,
        interactionControl: 'action',
        interactionDebug: false,
      }
    },
    SpriteIndicatorComponent,
    ConversationBoxComponent,
  ]
};