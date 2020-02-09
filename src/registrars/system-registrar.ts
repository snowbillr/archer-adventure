import { SheepGateSystem } from '../systems/sheep-gate-system';
import { KnightForestCustceneSystem } from '../systems/knight-forest-cutscene-system';
import { AdventurerKnightSystem } from '../systems/adventurer-knight-system';
import { ProgressionDocument } from '../persistence/progression/progression-document';

type SystemConfig = {
  progressionRestriction: Progression.ItemIdentifier,
  system: Phecs.SystemConstructor
};

const areaSystems: Record<string, SystemConfig[]> = {
  'woollards-farm': [
    {
      progressionRestriction: { type: 'conversation', name: 'oldMan', index: 0 },
      system: SheepGateSystem,
    }
  ],
  'woollards-house': [],
  'forest': [
    {
      progressionRestriction: { type: 'conversation', name: 'knight', index: 0 },
      system: AdventurerKnightSystem
    },
    {
      progressionRestriction: { type: 'conversation', name: 'knight', index: 0 },
      system: KnightForestCustceneSystem
    }
  ],
  'town': []
};

export const SystemRegistrar = {
  getSystemsForArea(areaKey: string) {
    return areaSystems[areaKey].map(systemConfig => systemConfig.system);
  },

  getFilteredSystemsForArea(areaKey: string, progression: ProgressionDocument) {
    const systems = areaSystems[areaKey];

    return systems.filter(systemConfig => {
      return !progression.areCompleted([systemConfig.progressionRestriction]);
    }).map(systemConfig => systemConfig.system);
  }
}
