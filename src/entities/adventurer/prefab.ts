export const adventurerPrefab = {
  name: 'adventurer',

  tags: "sprite,physics-body,adventurer,attachment,hasHurtboxes,bounds,hasInteractionCircle,sign-interactor,hasPhiniteStateMachine,shootsArrows",

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
