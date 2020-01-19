import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { SpriteComponent } from "../../components/sprite-component";
import { BoundsComponent } from "../../components/bounds-component";
import { NameComponent } from "../../components/name-component";

export const knightPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'knight',
        frame: 0,
      }
    },
    PhysicsBodyComponent,
    {
      component: BoundsComponent,
      data: {
        boundsKey: "knight-bounds",
      }
    },
    NameComponent
  ]
};
