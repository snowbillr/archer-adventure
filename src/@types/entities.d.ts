declare namespace Entities {
  type Sign = Systems.HasInteractionCircle.Entity & Systems.HasIndicator.Entity;

  type Adventurer = Systems.HasPhysicalSprite.Entity
    & Systems.HasInteractionCircle.Entity
    & Systems.HasHurtboxes.Entity
    & Systems.HasControls.Entity
    & Systems.HasBounds.Entity
    & Systems.ShootsArrows.Entity;

  type Sheep = Systems.HasPhysicalSprite.Entity & Systems.HasAreaBoundary.Entity;

  type Arrow = Systems.HasPhysicalSprite.Entity;
}
