export class StateRegistrarPlugin extends Phaser.Plugins.BasePlugin {
  private states: { [key: string]: PhiniteStateMachine.States.State<any> };
  private sets: { [key: string]: string[] };

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);

    this.states = {};
    this.sets = {};
  }


  addState(id: string, state: PhiniteStateMachine.States.State<any>) {
    this.states[id] = state;
  }

  getState(id: string): PhiniteStateMachine.States.State<any>{
    return this.states[id];
  }

  addSet(id: string, stateIds: string[]) {
    this.sets[id] = stateIds;
  }

  getSet(id: string): PhiniteStateMachine.States.State<any>[] {
    return this.sets[id].map(stateId => this.states[stateId]);
  }
}
