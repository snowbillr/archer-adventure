import { SpriteComponent } from "../../components/sprite-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { ConversationComponent } from "../../components/conversation-component";
import { NpcComponent } from "../../components/npc-component";

export const npcPrefab: Phecs.Prefab = {
  components: [
    SpriteComponent,
    PhiniteStateMachineComponent,
    {
      component: InteractionCircleComponent,
      data: {
        interactionRadius: 70,
        interactionDebug: false,
      }
    },
    SpriteIndicatorComponent,
    ConversationComponent,
    NpcComponent,
  ]
};