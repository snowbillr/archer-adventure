export const adventurerPrefab = {
  name: 'adventurer',

  tags: "sprite,physics-body,adventurer,attachment,hurtbox,bounds,interaction-circle,phinite-state-machine,shoots-arrows",

  attachmentDebug: false,

  boundsKey: "adventurer-bounds",

  texture: "adventurer-core",
  frame: 0,
  maxVelocityX: 350,

  hurtboxesKey: "adventurer-hurtboxes",

  interactionRadius: 30,
  interactionDebug: false,

  stateSet: "adventurer",
  initialStateId: "adventurer-stand",
}
