import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { SpriteComponent } from "../../components/sprite-component";
import { BoundsComponent } from "../../components/bounds-component";
import { NameComponent } from "../../components/name-component";
import { InteractionComponent } from "../../components/interaction-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { AttachmentComponent } from "../../components/attachment-component";
import { ConversationComponent } from "../../components/conversation-component";

export const knightPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'knight',
        frame: 'ready_1',
      }
    },
    PhysicsBodyComponent,
    {
      component: BoundsComponent,
      data: {
        boundsKey: "knight-bounds",
      }
    },
    {
      component: ConversationComponent,
      data: {
        conversationKey: "knight"
      }
    },
    NameComponent,
    AttachmentComponent,
    SpriteIndicatorComponent,
    {
      component: InteractionComponent,
      data: {
        interactionRadius: 50,
        debug: false
      }
    }
  ]
};
