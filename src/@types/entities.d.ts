declare namespace Entities {
  type Sign = Systems.HasInteractionCircle.Entity & Systems.HasSprite.Entity;

  type Adventurer = Systems.HasPhysicalSprite.Entity
    & Systems.HasInteractionCircle.Entity
    & Systems.HasHurtboxes.Entity
    & Systems.HasControls.Entity
    & Systems.HasBounds.Entity;

  type Sheep = Systems.HasSprite.Entity;
}
