import { EntityManager } from "../lib/phecs/entity-manager";
import { AttachmentComponent } from "../components/attachment-component";
import { Attachment } from "../lib/attachment";

type EntityFetcher = (phEntities: EntityManager) => Phecs.Entity[];
type OnHitCallback = (entity1: Phecs.Entity, entity2: Phecs.Entity) => void;

export abstract class BaseDamageSystem implements Phecs.System {
  private entities1Fetcher: EntityFetcher;
  private entities2Fetcher: EntityFetcher;
  private onHit: OnHitCallback;

  constructor(entities1Fetcher: EntityFetcher, entities2Fetcher: EntityFetcher, onHit: OnHitCallback) {
    this.entities1Fetcher = entities1Fetcher;
    this.entities2Fetcher = entities2Fetcher;
    this.onHit = onHit;
  }

  update(phEntities: EntityManager) {
    const entities1 = this.entities1Fetcher(phEntities);
    const entities2 = this.entities2Fetcher(phEntities);

    for (let entity1 of entities1) {
      const entity1Boxes = entity1.components[AttachmentComponent.tag]
                                            .getAttachmentsByType('hurtbox')
                                            .filter((hurtbox: Attachment) => hurtbox.isEnabled())

      for (let entity2 of entities2) {
        const entity2Boxes = entity2.components[AttachmentComponent.tag]
                                  .getAttachmentsByType('hitbox')
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