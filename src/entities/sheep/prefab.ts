export const sheepPrefab = {
  name: 'sheep',

  tags: 'sprite,physics-body,hasPhiniteStateMachine,hasAreaBoundary',

  areaBoundaryLeft: 1850,
  areaBoundaryRight: 2100,

  texture: 'sheep-walk',
  frame: 0,

  stateSet: 'sheep',
  initialStateId: 'sheep-walk-right',
};
