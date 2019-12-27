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

  getCurrentConversationKey(conversationKeyPath: string) {
    const conversationProgression = _.get(progressionDefinition, conversationKeyPath);

    if (!this.progressionCompletion[`${conversationKeyPath}[0]`]) {
      return _.get(progressionDefinition, `${conversationKeyPath}[0].conversationKey`)
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

    let lastConversation = lastCompletedConversation;
    if (lastUnlockedConversation > lastCompletedConversation) {
      lastConversation = lastUnlockedConversation;
    }

    if (lastConversation === conversationProgression.length - 1) {
      return _.get(progressionDefinition, `${conversationKeyPath}[${lastConversation}].conversationKey`);
    } else {
      return _.get(progressionDefinition, `${conversationKeyPath}[${lastConversation + 1}].conversationKey`);
    }
  }
}
