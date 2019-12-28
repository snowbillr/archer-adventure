import _ from 'lodash';

import { progressionDefinition } from '../constants/progression-definition';

type ProgressCompletion = { [keyPath: string]: boolean };

export class Progression {
  // This is a mapping of { keyPath: completed } for each item in the progression definition
  public progressionCompletion: ProgressCompletion;

  constructor() {
    this.progressionCompletion = {};
  }

  setCompletionData(progressCompletion: ProgressCompletion) {
    this.progressionCompletion = progressCompletion;
  }

  markComplete(keyPath: string) {
    this.progressionCompletion[keyPath] = true;
  }

  isUnlocked(keyPath: string): boolean {
    const dependencies: string[] = _.get(progressionDefinition, `${keyPath}.unlockDependencies`);
    return dependencies.every(dependencyKeyPath => this.progressionCompletion[dependencyKeyPath]);
  }

  markConversationComplete(conversationKey: string, index: number) {
    const keyPath = `conversations.${conversationKey}[index]`;
    this.markComplete(keyPath);
  }

  getCurrentConversationKeyPath(conversationKey: string) {
    const conversationKeyPath = `conversations.${conversationKey}`;
    const conversationProgression = _.get(progressionDefinition, conversationKeyPath);

    if (!this.progressionCompletion[`${conversationKeyPath}[0]`]) {
      return `${conversationKeyPath}[0]`;
    }

    let lastCompletedConversation = 0;
    let lastUnlockedConversation = 0;
    for (let i = 0; i < conversationProgression.length; i++) {
      if (this.progressionCompletion[`${conversationKeyPath}[${i}]`]) {
        lastCompletedConversation = i;
      }
      if (this.isUnlocked(`${conversationKeyPath}[${i}]`)) {
        lastUnlockedConversation = i;
      }
    }

    // let lastConversation = lastCompletedConversation;
    if (lastUnlockedConversation > lastCompletedConversation) {
      return `${conversationKeyPath}[${lastUnlockedConversation}]`;
      // lastConversation = lastUnlockedConversation;
    }

    if (lastCompletedConversation === conversationProgression.length - 1) {
      return `${conversationKeyPath}[${lastCompletedConversation}]`;
    } else {
      return `${conversationKeyPath}[${lastCompletedConversation + 1}]`;
    }
  }

  getConversationKey(conversationKeyPath: string) {
    return _.get(progressionDefinition, conversationKeyPath).conversationKey;
  }
}
