import { Script } from "./script";

const defaultOptions = {
  letterbox: false
};

export class Showrunner {
  private prologue: () => void;
  private epilogue: () => void;
  private script: Script;

  constructor(script: Script, options: Showrunner.ShowrunnerOptions = defaultOptions) {
    this.script = script;
    this.prologue = () => {};
    this.epilogue = () => {};

    return this;
  }

  setPrologue(prologueFn: () => void) {
    this.prologue = prologueFn;

    return this;
  }

  setEpilogue(epilogueFn: () => void) {
    this.epilogue = epilogueFn;

    return this;
  }

  async run() {
    this.prologue();

    await this.script.run();

    this.epilogue();

    return Promise.resolve();
  }
}