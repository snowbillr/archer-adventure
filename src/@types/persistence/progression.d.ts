declare module Progression {
  export type Type = 'conversation' | 'quest';

  export type ItemIdentifier = {
    type: Type;
    name: string;
    index: number;
  };

  type ConversationItem = {
    conversationId: string;
    unlockDependencies: Progression.ItemIdentifier[];
    completed?: boolean;
  }
}