export const enemyPrefab = {
  name: 'enemy',

  tags: 'hasPhysicalSprite,hasAttachments,hasPhiniteStateMachine,hasHurtboxes',

  attachmentDebug: false,

  texture: 'enemy',
  frame: 0,

  stateSet: 'enemy',
  initialStateId: 'enemy-idle',

  hurtboxesKey: 'enemy-hurtboxes',
};
