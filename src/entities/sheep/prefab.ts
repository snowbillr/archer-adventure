export const sheepPrefab = {
  name: 'sheep',

  tags: 'sprite,physics-body,area-boundary,phinite-state-machine',

  areaBoundaryLeft: 1400,
  areaBoundaryRight: 1630,

  texture: 'sheep-walk',
  frame: 0,
  depth: 0,

  stateSet: 'sheep',
  initialStateId: 'sheep-walk-right',
};
