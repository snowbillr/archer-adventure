export const enemyPrefab = {
  name: 'enemy',

  tags: 'sprite,physics-body,attachment,hasPhiniteStateMachine,hasHurtboxes',

  attachmentDebug: false,

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',
};
