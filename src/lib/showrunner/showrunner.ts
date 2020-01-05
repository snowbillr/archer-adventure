import { Script } from "./script";

export class Showrunner {
  private script: Script;

  constructor(script: Script) {
    this.script = script;
  }

  async run() {
    await this.script.run();

    return Promise.resolve();
  }
}