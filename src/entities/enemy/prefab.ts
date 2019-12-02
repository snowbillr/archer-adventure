export const enemyPrefab = {
  name: 'enemy',

  tags: 'sprite,physics-body,attachment,phinite-state-machine,hurtbox,health,enemy',

  attachmentDebug: false,

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',

  maxHealth: 3,
};
