import { SpriteComponent } from "../../components/sprite-component";
import { HurtboxComponent } from "../../components/hurtbox-component";
import { AttachmentComponent } from "../../components/attachment-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";

export const barrelPrefab: Phecs.Prefab = {
  components: [
    AttachmentComponent,
    {
      component: SpriteComponent,
      data: {
        texture: 'barrel',
        frame: 0,
      }
    },
    {
      component: HurtboxComponent,
      data: {
        hurtboxesKey: 'barrel-hurtboxes',
        debug: false,
      }
    },
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: "barrel",
        initialStateId: "barrel-idle",
      }
    },
  ]
}