export const arrowPrefab = {
  name: 'arrow',

  tags: 'hasPhysicalSprite,hasPhiniteStateMachine,hasBounds,hasAttachments,hasHitboxes',

  texture: 'arrow',
  frame: 0,

  stateSet: 'arrow',
  initialStateId: 'arrow-flying',

  boundsKey: 'arrow-bounds',

  hitboxesKey: 'arrow-hitboxes',

  attachmentDebug: false,
};
