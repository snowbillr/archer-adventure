import { ConversationDocument } from './conversation-document';

export class ProgressionDocument implements Persistence.Document {
  public conversations!: ConversationDocument;

  constructor() {
    this.reset();
  }

  areCompleted(progressionIdentifiers: Progression.ItemIdentifier[]) {
    return progressionIdentifiers.every(identifier => {
      switch(identifier.type) {
        case "conversation": {
          return this.conversations.isCompleted(identifier);
        }
        case "quest": {
          // return this.quests.isComplete(progressionIdentifier);
          return false;
        }
      }
    });
  }

  reset() {
    this.conversations = new ConversationDocument(this);
  }

  fromJson(json: Record<string, any>) {
    this.conversations.fromJson(json.conversations);
  }

  toJson() {
    return {
      conversations: this.conversations.toJson(),
    };
  }
}
