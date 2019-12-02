export const arrowPrefab = {
  name: 'arrow',

  tags: 'sprite,physics-body,attachment,hitbox,phinite-state-machine,bounds',

  texture: 'arrow',
  frame: 0,

  stateSet: 'arrow',
  initialStateId: 'arrow-disabled',

  boundsKey: 'arrow-bounds',

  hitboxesKey: 'arrow-hitboxes',

  attachmentDebug: true,
};
