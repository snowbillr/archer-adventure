import { SpriteComponent } from "../../components/sprite-component";
import { DoorComponent } from "../../components/door-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { InteractionComponent } from "../../components/interaction-component";
import { AttachmentComponent } from "../../components/attachment-component";

export const doorPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'doors',
        frame: 1,
        depth: 2,
      }
    },
    DoorComponent,
    SpriteIndicatorComponent,
    {
      component: AttachmentComponent,
      data: {
        attachmentDebug: false,
      }
    },
    {
      component: InteractionComponent,
      data: {
        interactionRadius: 40,
        debug: false,
      }
    },
  ]
}