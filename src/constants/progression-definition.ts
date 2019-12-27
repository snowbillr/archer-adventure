export const progressionDefinition = {
  conversations: {
    oldLady: [
      {
        conversationKey: 'oldLady1',
        unlockDependencies: [],
      },
      {
        conversationKey: 'oldLady2',
        unlockDependencies: ['conversations.oldMan[0]'],
      },
      {
        conversationKey: 'oldLady3',
        unlockDependencies: ['quests.saveFarm'],
      }
    ],
    oldMan: [
      {
        conversationKey: 'oldMan1',
        unlockDependencies: [],
      },
      {
        conversationKey: 'oldMan2',
        unlockDependencies: ['quests.saveFarm'],
      }
    ]
  },
  quests: {
    saveFarm: {
      unlockDependencies: ['conversations.oldMan[0]'],
    }
  }
}
