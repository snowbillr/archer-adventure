export const adventurerPrefab = {
  name: 'adventurer',

  tags: "hasPhysicalSprite,hasAttachments,hasHurtboxes,hasBounds,hasControls,hasInteractionCircle,sign-interactor,hasPhiniteStateMachine,doorInteractor,shootsArrows",

  attachmentDebug: false,

  boundsKey: "adventurer-bounds",

  texture: "adventurer-core",
  frame: 0,
  maxVelocityX: 350,

  hurtboxesKey: "adventurer-hurtboxes",

  interactionRadius: 30,

  stateSet: "adventurer",
  initialStateId: "adventurer-stand",
}
