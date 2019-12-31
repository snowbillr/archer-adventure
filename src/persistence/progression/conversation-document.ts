import { ProgressionDocument } from "./progression-document";

export class ConversationDocument implements Persistence.Document {
  private progression: ProgressionDocument;

  private oldLady: Progression.ConversationItem[] = [
    {
      conversationId: 'oldLady1',
      unlockDependencies: [],
      completed: false,
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
      completed: false,
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
      completed: false,
    }
  ];

  private oldMan: Progression.ConversationItem[] = [
    {
      conversationId: 'oldMan1',
      unlockDependencies: [],
      completed: false,
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
      completed: false,
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
      completed: false,
    }
  ];

  constructor(progression: ProgressionDocument) {
    this.progression = progression;
  }

  getCurrentConversationId(conversationName: string) {
    const currentConversation = this.getCurrentConversation(conversationName);

    return currentConversation.conversationId;
  }

  markCurrentConversationComplete(conversationName: string) {
    const currentConversation = this.getCurrentConversation(conversationName);

    currentConversation.completed = true;
  }

  isUnlocked(conversation: Progression.ConversationItem) {
    return this.progression.areCompleted(conversation.unlockDependencies);
  }

  isComplete(conversationIdentifier: Progression.ItemIdentifier) {
    switch(conversationIdentifier.name) {
      case "oldLady":
        return this.oldLady[conversationIdentifier.index].completed;
      case "oldMan":
        return this.oldMan[conversationIdentifier.index].completed;
      default:
        throw new Error("ConversationDocument::CANNOT_CHECK_IF_COMPLETE::INVALID_CONVERSATION_NAME");
    }
  }

  fromJson(json: Record<string, boolean[]>): void {
    json.oldLady.forEach((completed, index) => {
      this.oldLady[index].completed = completed;
    });

    json.oldMan.forEach((completed, index) => {
      this.oldMan[index].completed = completed;
    });
  }

  toJson(): object {
    const oldLadyData = this.oldLady.map(conversationInfo => {
      return conversationInfo.completed;
    });

    const oldManData = this.oldMan.map(conversationInfo => {
      return conversationInfo.completed;
    });

    return {
      oldLady: oldLadyData,
      oldMan: oldManData,
    };
  }

  private getCurrentConversation(conversationKey: string) {
    let conversation = null;
    switch(conversationKey) {
      case "oldLady":
        conversation = this.oldLady;
        break;
      case "oldMan":
        conversation = this.oldMan;
        break;
      default:
        throw new Error("ConversationDocument::CANNOT_GET_CURRENT_CONVERSATION_ID::INVALID_CONVERSATION_NAME");
    }

    let lastUnlockedConversationIndex = 0;
    for (let i = 0; i < conversation.length; i++) {
      if (this.isUnlocked(conversation[i])) {
        lastUnlockedConversationIndex = i;
      }
    }

    return conversation[lastUnlockedConversationIndex]; 
  }
}