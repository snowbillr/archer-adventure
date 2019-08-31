declare namespace Entities {
  type Adventurer = Systems.HasPhysicalSprite.Entity
    & Systems.HasInteractionCircle.Entity
    & Systems.HasHurtboxes.Entity
    & Systems.HasControls.Entity
    & Systems.HasBounds.Entity;
}
