type AreaConfig = {
  mapKey: string,
  tilesetName: string,
  tilesetKey: string
}

const areaMap: Record<string, AreaConfig> = {};

function registerArea(key: string, mapKey: string, tilesetName: string, tilesetKey: string) {
  areaMap[key] = {
    mapKey,
    tilesetName,
    tilesetKey,
  };
}

function getArea(key: string): AreaConfig {
  return areaMap[key];
}

registerArea('woollards-farm', 'woollards-farm', 'core-tileset', 'core-tileset');
registerArea('woollards-house', 'woollards-house', 'core-tileset', 'core-tileset');
registerArea('forest', 'forest', 'core-tileset', 'core-tileset');

export const AreaRegistrar = {
  getArea
};
