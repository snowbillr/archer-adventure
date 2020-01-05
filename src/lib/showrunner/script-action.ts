type ScriptRunFn = () => Promise<any>;

export class ScriptAction {
  private runFn: ScriptRunFn;

  constructor(runFn: ScriptRunFn) {
    this.runFn = runFn;
  }

  async run() {
    return this.runFn();
  }
}
