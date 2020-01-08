import { SpriteComponent } from "../../components/sprite-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { AttachmentComponent } from "../../components/attachment-component";
import { HitboxComponent } from "../../components/hitbox-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { BoundsComponent } from "../../components/bounds-component";

export const arrowPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'arrow',
        frame: 0,
      }
    },
    PhysicsBodyComponent,
    {
      component: AttachmentComponent,
      data: {
        attachmentDebug: false,
      }
    },
    {
      component: HitboxComponent,
      data: {
        hitboxesKey: 'arrow-hitboxes',
        debug: false,
      }
    },
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: 'arrow',
        initialStateId: 'arrow-disabled',
      }
    },
    {
      component: BoundsComponent,
      data: {
        boundsKey: 'arrow-bounds',
      }
    },
  ]
};
