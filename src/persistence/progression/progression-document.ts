import { progressionDefinition } from '../../constants/progression-definition';
import { ConversationDocument } from './conversation-document';

export class ProgressionDocument implements Persistence.Document {
  public conversations: ConversationDocument;

  constructor() {
    this.conversations = new ConversationDocument(this);
  }

  areCompleted(progressionIdentifiers: Progression.ItemIdentifier[]) {
    return progressionIdentifiers.every(identifier => {
      switch(identifier.type) {
        case "conversation": {
          return this.conversations.isComplete(identifier);
        }
        case "quest": {
          // return this.quests.isComplete(progressionIdentifier);
          return false;
        }
      }
    });
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
