export const DepthManager = new class {
  depthFor(depthId: string) {
    if (this.depths[depthId]) {
      return this.depths[depthId];
    } else {
      throw new Error('DepthManager::INVALID_DEPTH_ID');
    }
  }

  private depths: Record<string, number> = {
    background0: 10,
    background1: 11,
    background2: 12,
    background3: 13,
    background4: 14,
    background5: 15,
    background6: 16,
    background7: 17,
    background8: 18,
    background9: 19,
    background10: 20,
    background11: 21,
    background12: 22,
    background13: 23,
    background14: 24,
    background15: 25,
    background16: 26,
    background17: 27,
    background18: 28,
    background19: 29,

    ground: 40,

    door: 50,

    adventurer: 60,

    foreground0: 70,
    foreground1: 71,
    foreground2: 72,
    foreground3: 73,
    foreground4: 74,
    foreground5: 75,
    foreground6: 76,
    foreground7: 77,
    foreground8: 78,
    foreground9: 79,
    foreground10: 80,
    foreground11: 81,
    foreground12: 82,
    foreground13: 83,
    foreground14: 84,
    foreground15: 85,
    foreground16: 86,
    foreground17: 87,
    foreground18: 88,
    foreground19: 89,

    notifications: 100
  };
}
