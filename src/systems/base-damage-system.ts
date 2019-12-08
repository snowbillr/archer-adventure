import { EntityManager } from "../lib/phecs/entity-manager";
import { AttachmentComponent } from "../components/attachment-component";
import { Attachment } from "../lib/attachment";

type EntityFetcher = (phEntities: EntityManager) => Phecs.Entity[];
type OnHitCallback = (entity1: Phecs.Entity, entity2: Phecs.Entity) => void;
type EntityConfig = {
  entityFetcher: EntityFetcher,
  boxType: string,
}

export abstract class BaseDamageSystem implements Phecs.System {
  private entities1Config: EntityConfig;
  private entities2Config: EntityConfig;
  private onHit: OnHitCallback;

  constructor(entities1Config: EntityConfig, entities2Config: EntityConfig, onHit: OnHitCallback) {
    this.entities1Config = entities1Config;
    this.entities2Config = entities2Config;
    this.onHit = onHit;
  }

  update(phEntities: EntityManager) {
    const entities1 = this.entities1Config.entityFetcher(phEntities);
    const entities2 = this.entities2Config.entityFetcher(phEntities);

    for (let entity1 of entities1) {
      const entity1Boxes = entity1.components[AttachmentComponent.tag]
                                            .getAttachmentsByType(this.entities1Config.boxType)
                                            .filter((hurtbox: Attachment) => hurtbox.isEnabled())

      for (let entity2 of entities2) {
        const entity2Boxes = entity2.components[AttachmentComponent.tag]
                                  .getAttachmentsByType(this.entities2Config.boxType)
                                  .filter((hitbox: Attachment) => hitbox.isEnabled())

        if (this.doBoxesOverlap(entity1Boxes, entity2Boxes)) {
          this.onHit(entity1, entity2);
        }
      }
    }
  }

  private doBoxesOverlap(boxes1: Attachment[], boxes2: Attachment[]) {
    let overlapping = false;

    for (let box1 of boxes1) {
      if (overlapping) break;
    
      for (let box2 of boxes2) {
        if (overlapping) break;

        overlapping = box1.overlaps(box2);
      }
    }

    return overlapping;
  }
}