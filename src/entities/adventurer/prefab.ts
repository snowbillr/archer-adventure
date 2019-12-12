import { SpriteComponent } from "../../components/sprite-component";
import { PhysicsBodyComponent } from "../../components/physics-body-component";
import { AdventurerComponent } from "../../components/adventurer-component";
import { AttachmentComponent } from "../../components/attachment-component";
import { HurtboxComponent } from "../../components/hurtbox-component";
import { BoundsComponent } from "../../components/bounds-component";
import { InteractionCircleComponent } from "../../components/interaction-circle-component";
import { PhiniteStateMachineComponent } from "../../components/phinite-state-machine-component";
import { ShootsArrowsComponent } from "../../components/shoots-arrows-component";
import { HealthComponent } from "../../components/health-component";
import { InvulnerabilityComponent } from "../../components/invulnerability-component";

export const adventurerPrefab: Phecs.Prefab = {
  components: [
    {
      component: SpriteComponent,
      data: {
        texture: "adventurer-core",
        frame: 0,
      }
    },
    {
      component: PhysicsBodyComponent,
      data: {
        maxVelocityX: 350,
      }
    },
    AdventurerComponent,
    {
      component: AttachmentComponent,
      data: {
        attachmentDebug: false,
      }
    },
    {
      component: HurtboxComponent,
      data: {
        hurtboxesKey: "adventurer-hurtboxes",
      }
    },
    {
      component: BoundsComponent,
      data: {
        boundsKey: "adventurer-bounds",
      }
    },
    {
      component: InteractionCircleComponent,
      data: {
        interactionRadius: 30,
        interactionDebug: false,
      }
    },
    {
      component: PhiniteStateMachineComponent,
      data: {
        stateSet: "adventurer",
        initialStateId: "adventurer-stand",
      }
    },
    {
      component: ShootsArrowsComponent,
    },
    InvulnerabilityComponent,
  ]
}
