const areaMusic: Record<string, string> = {
  'woollards-farm': 'farm',
  'woollards-house': 'farm',
  'forest': 'forest'
};

export const MusicRegistrar = {
  getMusicForArea(areaKey: string) {
    return areaMusic[areaKey];
  }
}