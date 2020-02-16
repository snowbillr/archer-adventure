import { adventurerStates } from "../entities/adventurer/states";
import { arrowStates } from "../entities/arrow/states";
import { barrelStates } from "../entities/barrel/states";
import { enemyStates } from "../entities/enemy/states";
import { sheepStates } from "../entities/sheep/states";
import { oldLadyStates } from "../entities/old-lady/states";
import { oldManStates } from "../entities/old-man/states";
import { girlStates } from "../entities/girl/states";
import { trainerStates } from "../entities/trainer/states";

const states: Record<string, PhiniteStateMachine.States.State<any>> = {};
const sets: Record<string, string[]> = {};

function registerSets(newSets: { id: string, states: PhiniteStateMachine.States.State<any>[]}[]) {
  newSets.forEach(set => {
    set.states.forEach(setState => {
      states[setState.id] = setState;
    });

    sets[set.id] = set.states.map(setState => setState.id);
  });
}

function getState(id: string): PhiniteStateMachine.States.State<any>{
  return states[id];
}

function getSet(id: string): PhiniteStateMachine.States.State<any>[] {
  return sets[id].map(stateId => states[stateId]);
}

registerSets([
  { id: 'adventurer', states: adventurerStates },
  { id: 'arrow', states: arrowStates },
  { id: 'enemy', states: enemyStates },
  { id: 'sheep', states: sheepStates },
  { id: 'old-lady', states: oldLadyStates },
  { id: 'old-man', states: oldManStates },
  { id: 'girl', states: girlStates },
  { id: 'trainer', states: trainerStates },
  { id: 'barrel', states: barrelStates },
]);

export const StateRegistrar = {
  getState,
  getSet
};
