export const enemyPrefab = {
  name: 'enemy',

  tags: 'sprite,physics-body,attachment,phinite-state-machine,hurtbox,hitbox,health,interaction-circle,enemy,zone-boundary',

  attachmentDebug: false,

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',
  hitboxesKey: 'enemy-hitboxes',

  maxHealth: 2,

  interactionRadius: 220,
  interactionDebug: false,

  zoneBoundaryName: 'enemyBounds',
};
