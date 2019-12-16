import { SpriteComponent } from "../../components/sprite-component";

export const oldLadyPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: 'old-lady',
      }
    }
  ]
};