import { ProgressionDocument } from "./progression-document";

import { conversations } from './progression';

export class ConversationDocument implements Persistence.Document {
  private progression: ProgressionDocument;

  private conversations: Record<string, Progression.ConversationItem[]>;

  constructor(progression: ProgressionDocument) {
    this.progression = progression;
    this.conversations = { ...conversations };
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

  isCompleted(conversationIdentifier: Progression.ItemIdentifier) {
    return this.conversations[conversationIdentifier.name][conversationIdentifier.index].completed;

    /*
    switch(conversationIdentifier.name) {
      case "oldLady":
        return this.oldLady[conversationIdentifier.index].completed;
      case "oldMan":
        return this.oldMan[conversationIdentifier.index].completed;
      default:
        throw new Error("ConversationDocument::CANNOT_CHECK_IF_COMPLETE::INVALID_CONVERSATION_NAME");
    }
    */
  }

  fromJson(json: Record<string, boolean[]>): void {
    Object.entries(json).forEach(([conversationKey, conversationRecords]) => {
      conversationRecords.forEach((completed, index) => {
        this.conversations[conversationKey][index].completed = completed;
      });
      this.conversations[conversationKey]
    });

    /*
    json.oldLady.forEach((completed, index) => {
      this.oldLady[index].completed = completed;
    });

    json.oldMan.forEach((completed, index) => {
      this.oldMan[index].completed = completed;
    });
    */
  }

  toJson(): object {
    const json: Record<string, boolean[]> = {};
    Object.entries(this.conversations).forEach(([conversationKey, conversationItems]) => {
      json[conversationKey] = conversationItems.map(conversationItem => !!conversationItem.completed);
    });

    /*
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
    */

    return json;
  }

  reset() {
    Object.entries(this.conversations).forEach(([conversationKey, conversationItems]) => {
      conversationItems.forEach(conversationItem => conversationItem.completed = false);
    });
    /*
    this.oldLady.forEach(conversationInfo => conversationInfo.completed = false);
    this.oldMan.forEach(conversationInfo => conversationInfo.completed = false);
    */
  }

  private getCurrentConversation(conversationKey: string) {
    /*
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
    */
    const conversation = this.conversations[conversationKey];

    let lastUnlockedConversationIndex = 0;
    for (let i = 0; i < conversation.length; i++) {
      if (this.isUnlocked(conversation[i])) {
        lastUnlockedConversationIndex = i;
      }
    }

    return conversation[lastUnlockedConversationIndex]; 
  }
}