import { SpriteComponent } from "../../components/sprite-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { ConversationComponent } from "../../components/conversation-component";
import { NpcComponent } from "../../components/npc-component";
import { AttachmentComponent } from "../../components/attachment-component";

export const npcPrefab: Phecs.Prefab = {
  components: [
    SpriteComponent,
    PhiniteStateMachineComponent,
    {
      component: AttachmentComponent,
      data: {
        attachmentDebug: false,
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
    ConversationComponent,
    NpcComponent,
  ]
};