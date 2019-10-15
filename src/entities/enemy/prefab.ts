export const enemyPrefab = {
  name: 'enemy',

  tags: 'hasPhysicalSprite,hasPhiniteStateMachine,hasHurtboxes',

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',
  hurtboxesDebug: false,
};
