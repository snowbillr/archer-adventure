import { SpriteComponent } from "../../components/sprite-component";
import { BoundsComponent } from "../../components/bounds-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";

export const adventurerTestPrefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: "adventurer-core",
        frame: 0,
      }
    },
    {
      component: BoundsComponent,
      data: {
        boundsKey: "adventurer-bounds",
      }
    },
    PhysicsBodyComponent
  ]
};
