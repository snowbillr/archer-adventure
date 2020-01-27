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
    if (!this.conversations[conversationIdentifier.name][conversationIdentifier.index]) {
      throw new Error("ConversationDocument::CANNOT_CHECK_IF_COMPLETE::INVALID_CONVERSATION_NAME");
    }

    return this.conversations[conversationIdentifier.name][conversationIdentifier.index].completed;
  }

  fromJson(json: Record<string, boolean[]>): void {
    Object.entries(json).forEach(([conversationKey, conversationRecords]) => {
      conversationRecords.forEach((completed, index) => {
        this.conversations[conversationKey][index].completed = completed;
      });
      this.conversations[conversationKey]
    });
  }

  toJson(): object {
    const json: Record<string, boolean[]> = {};
    Object.entries(this.conversations).forEach(([conversationKey, conversationItems]) => {
      json[conversationKey] = conversationItems.map(conversationItem => !!conversationItem.completed);
    });

    return json;
  }

  reset() {
    Object.entries(this.conversations).forEach(([conversationKey, conversationItems]) => {
      conversationItems.forEach(conversationItem => conversationItem.completed = false);
    });
  }

  private getCurrentConversation(conversationKey: string) {
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