const backgroundSets: Record<string, string[]> = {};

function registerBackgroundSet(name: string, layerNames: string[]) {
  backgroundSets[name] = layerNames;
}

function getBackgroundSet(name: string) {
  return backgroundSets[name];
}

registerBackgroundSet('green-hills', ['green-hills-1', 'green-hills-2', 'green-hills-3', 'green-hills-4'])

export const BackgroundRegistrar = {
  getBackgroundSet
};
