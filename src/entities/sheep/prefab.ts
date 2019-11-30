export const sheepPrefab = {
  name: 'sheep',

  tags: 'sprite,physics-body,area-boundary,phinite-state-machine',

  areaBoundaryLeft: 190,
  areaBoundaryRight: 400,

  texture: 'sheep-walk',
  frame: 0,

  stateSet: 'sheep',
  initialStateId: 'sheep-walk-right',
};
