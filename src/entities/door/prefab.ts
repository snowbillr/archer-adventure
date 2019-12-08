import { SpriteComponent } from "../../components/sprite-component";
import { DoorComponent } from "../../components/door-component";
import { IndicatorComponent } from "../../components/indicator-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";

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
    {
      component: DoorComponent,
    },
    {
      component: IndicatorComponent,
    },
    {
      component: InteractionCircleComponent,
      data: {
        interactionControl: 'action',
        interactionRadius: 40,
      }
    }
  ]
}