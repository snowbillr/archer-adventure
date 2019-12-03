export const sheepPrefab = {
  name: 'sheep',

  tags: 'sprite,physics-body,phinite-state-machine,zone-boundary',

  zoneBoundaryName: 'sheepBounds',

  texture: 'sheep-walk',
  frame: 0,
  depth: 0,

  stateSet: 'sheep',
  initialStateId: 'sheep-walk-right',
};
