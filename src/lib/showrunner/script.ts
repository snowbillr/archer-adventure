import { ScriptAction } from "./script-action";

export class Script {
  private scriptActions: ScriptAction[];

  constructor(scriptActions: ScriptAction[]) {
    this.scriptActions = scriptActions;
  }

  async run() {
    for (let scriptAction of this.scriptActions) {
      await scriptAction.run();
    }

    return Promise.resolve();
  }
}