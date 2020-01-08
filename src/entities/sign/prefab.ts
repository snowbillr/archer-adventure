import { SpriteComponent } from "../../components/sprite-component";
import { InteractionComponent } from "../../components/interaction-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { TextboxComponent } from "../../components/textbox-component";
import { AttachmentComponent } from "../../components/attachment-component";

export const signPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'core-tileset-spritesheet',
        frame: 1128,
      }
    },
    {
      component: AttachmentComponent,
      data: {
        attachmentDebug: false,
      }
    },
    {
      component: InteractionComponent,
      data: {
        interactionRadius: 30,
        debug: false,
      }
    },
    SpriteIndicatorComponent,
    TextboxComponent,
  ]
}
