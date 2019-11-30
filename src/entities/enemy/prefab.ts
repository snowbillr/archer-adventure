export const enemyPrefab = {
  name: 'enemy',

  tags: 'sprite,physics-body,attachment,phinite-state-machine,hurtbox',

  attachmentDebug: true,

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',
};
