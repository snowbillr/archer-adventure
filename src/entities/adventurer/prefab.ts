export const adventurerPrefab = {
  name: 'adventurer',

  tags: "sprite,physics-body,adventurer,attachment,hurtbox,bounds,interaction-circle,sign-interactor,phinite-state-machine,shoots-arrows",

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
