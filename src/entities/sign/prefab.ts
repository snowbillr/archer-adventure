import { SpriteComponent } from "../../components/sprite-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { SpriteIndicatorComponent } from "../../components/sprite-indicator-component";
import { TextboxComponent } from "../../components/textbox-component";

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
      component: InteractionCircleComponent,
      data: {
        interactionRadius: 30,
        interactionDebug: false,
      }
    },
    SpriteIndicatorComponent,
    TextboxComponent,
  ]
}
