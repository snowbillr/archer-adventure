export const conversations: Record<string, Progression.ConversationItem[]> = {
  oldLady: [
    {
      conversationId: 'oldLady1',
      unlockDependencies: [],
    },
    {
      conversationId: 'oldLady2',
      unlockDependencies: [
        {
          type: 'conversation',
          name: 'oldMan',
          index: 0
        }
      ],
    },
    {
      conversationId: 'oldLady3',
      unlockDependencies: [
        {
          type: 'quest',
          name: 'saveFarm',
          index: 0
        }
      ],
    }
  ],
  
  oldMan: [
    {
      conversationId: 'oldMan1',
      unlockDependencies: [],
    },
    {
      conversationId: 'oldMan2',
      unlockDependencies: [
        {
          type: 'conversation',
          name: 'oldMan',
          index: 0,
        }
      ],
    },
    {
      conversationId: 'oldMan3',
      unlockDependencies: [
        {
          type: 'quest',
          name: 'saveFarm',
          index: 0
        }
      ],
    }
  ],

  knight: [
    {
      conversationId: 'knight1',
      unlockDependencies: []
    }
  ],

  girl: [
    {
      conversationId: 'girl1',
      unlockDependencies: []
    }
  ]
}
