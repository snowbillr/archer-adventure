export const arrowPrefab = {
  name: 'arrow',

  tags: 'sprite,physics-body,hasPhiniteStateMachine,bounds,attachment,hasHitboxes',

  texture: 'arrow',
  frame: 0,

  stateSet: 'arrow',
  initialStateId: 'arrow-flying',

  boundsKey: 'arrow-bounds',

  hitboxesKey: 'arrow-hitboxes',

  attachmentDebug: false,
};
