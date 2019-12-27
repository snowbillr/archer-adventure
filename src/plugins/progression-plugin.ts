import _ from 'lodash';

import { progressionDefinition } from '../constants/progression-definition';
import { PERSISTENCE_KEYS } from '../constants/persistence-keys';
import { PersistencePlugin } from './persistence-plugin';

export class ProgressionPlugin extends Phaser.Plugins.BasePlugin {
  // This is a mapping of { keyPath: completed } for each item in the progression definition
  private progressionCompletion: { [keyPath: string]: boolean };

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.progressionCompletion = {};
  }

  markComplete(keyPath: string) {
    this.progressionCompletion[keyPath] = true;
  }

  isUnlocked(keyPath: string): boolean {
    const dependencies: string[] = _.get(progressionDefinition, keyPath);
    return dependencies.every(dependencyKeyPath => this.progressionCompletion[dependencyKeyPath]);
  }

  getCurrentConversationKey(conversationKeyPath: string) {
    const conversationProgression = _.get(progressionDefinition, conversationKeyPath);
    let lastCompletedConversation = 0;
    for (let i = 0; i < conversationProgression.length; i++) {
      if (this.progressionCompletion[`${conversationKeyPath}[${i}]`]) {
        lastCompletedConversation = i;
      }
    }

    if (lastCompletedConversation === conversationProgression.length - 1) {
      return _.get(progressionDefinition, `${conversationKeyPath}[${lastCompletedConversation}].conversationKey`);
    } else {
      return _.get(progressionDefinition, `${conversationKeyPath}[${lastCompletedConversation + 1}].conversationKey`);
    }
  }

  // are these necessary?

  save() {
    const persistence = this.game.plugins.get('PersistencePlugin') as PersistencePlugin;

    persistence.set(PERSISTENCE_KEYS.progression, this.progressionCompletion);
    persistence.save();
  }

  load() {
    const persistence = this.game.plugins.get('PersistencePlugin') as PersistencePlugin;

    this.progressionCompletion = persistence.get(PERSISTENCE_KEYS.progression);
  }

}
