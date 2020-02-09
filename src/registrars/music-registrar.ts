const areaMusic: Record<string, string> = {
  'woollards-farm': 'farm',
  'woollards-house': 'farm',
  'forest': 'forest',
  'town': 'farm'
};

export const MusicRegistrar = {
  getMusicForArea(areaKey: string) {
    return areaMusic[areaKey];
  }
}