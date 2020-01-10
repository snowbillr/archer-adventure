import { SpriteComponent } from "../../components/sprite-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { ZoneBoundaryComponent } from "../../components/zone-boundary-component";
import { InteractionComponent } from "../../components/interaction-component";
import { ConversationComponent } from "../../components/conversation-component";
import { SayComponent } from "../../components/say-component";
import { AttachmentComponent } from "../../components/attachment-component";

export const sheepPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'sheep-walk',
        frame: 0,
      }
    },
    PhysicsBodyComponent,
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: 'sheep',
        initialStateId: 'sheep-idle',
      }
    },
    {
      component: ZoneBoundaryComponent,
      data: {
        zoneBoundaryName: 'sheepBounds',
      }
    },
    {
      component: AttachmentComponent,
      data: {
        attachmentDebug: true,
      }
    },
    {
      component: InteractionComponent,
      data: {
        debug: false,
        shapeConfig: {
          shape: 'rectangle',
          width: 40,
          height: 100,
          offsetY: -30,
        }
      }
    },
    SayComponent,
  ]
};
