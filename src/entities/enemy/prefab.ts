export const enemyPrefab = {
  name: 'enemy',

  tags: 'sprite,physics-body,attachment,phinite-state-machine,hurtbox,health,interaction-circle,enemy',

  attachmentDebug: false,

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',

  maxHealth: 2,

  interactionRadius: 220,
  interactionDebug: false,
};
