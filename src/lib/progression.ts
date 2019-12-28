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

    let latestUnlockedConversationIndex = -1;
    for (let i = 0; i < conversationProgression.length; i++) {
      if (this.isUnlocked(`${conversationKeyPath}[${i}]`)) {
        latestUnlockedConversationIndex = i;
      }
    }
    return `${conversationKeyPath}[${latestUnlockedConversationIndex}]`;
  }

  getConversationKey(conversationKeyPath: string) {
    return _.get(progressionDefinition, conversationKeyPath).conversationKey;
  }
}
