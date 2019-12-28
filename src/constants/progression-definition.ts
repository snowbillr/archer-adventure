export const progressionDefinition = {
  conversations: {
    oldLady: [
      {
        conversationId: 'oldLady1',
        unlockDependencies: [],
      },
      {
        conversationId: 'oldLady2',
        unlockDependencies: ['conversations.oldMan[0]'],
      },
      {
        conversationId: 'oldLady3',
        unlockDependencies: ['quests.saveFarm'],
      }
    ],
    oldMan: [
      {
        conversationId: 'oldMan1',
        unlockDependencies: [],
      },
      {
        conversationId: 'oldMan2',
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
