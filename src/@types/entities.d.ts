declare namespace Entities {
  type Sign = Phecs.Entity & Systems.HasInteractionCircle.Entity & Systems.HasIndicator.Entity;

  type Adventurer = Phecs.Entity
    & Systems.HasPhysicalSprite.Entity
    & Systems.HasInteractionCircle.Entity
    & Systems.HasHurtboxes.Entity
    & Systems.HasControls.Entity
    & Systems.HasBounds.Entity
    & Systems.ShootsArrows.Entity;

  type Enemy = Phecs.Entity & Systems.HasPhysicalSprite.Entity;

  type Sheep = Phecs.Entity & Systems.HasPhysicalSprite.Entity & Systems.HasAreaBoundary.Entity;

  type Arrow = Phecs.Entity & Systems.HasPhysicalSprite.Entity & Systems.HasPhiniteStateMachine.Entity<any>;
}
