export const arrowPrefab = {
  name: 'arrow',

  tags: 'sprite,physics-body,phinite-state-machine,bounds,attachment,hitbox',

  texture: 'arrow',
  frame: 0,

  stateSet: 'arrow',
  initialStateId: 'arrow-flying',

  boundsKey: 'arrow-bounds',

  hitboxesKey: 'arrow-hitboxes',

  attachmentDebug: true,
};
