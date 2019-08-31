export function StateMerge<T>(state1: Partial<PhiniteStateMachine.States.State<T>>, state2: Partial<PhiniteStateMachine.States.State<T>>): PhiniteStateMachine.States.State<T> {
  const onEnterChain = [state1.onEnter, state2.onEnter].filter(Boolean);
  const onUpdateChain = [state1.onUpdate, state2.onUpdate].filter(Boolean);
  const transitions = [state1.transitions, state2.transitions]
    .filter(Boolean)
    .flat()
    .reduce((deduped: PhiniteStateMachine.Transitions.Transition<T>[], transition) => {
      if (!deduped.find(t => t.to === transition.to)) {
        deduped.push(transition);
      }

      return deduped;
    }, []);
  const data: PhiniteStateMachine.States.StateData = { ...state1.data, ...state2.data };

  const mergedState: PhiniteStateMachine.States.State<T> = {
    id: (state1.id || state2.id)!,
    transitions: transitions,
    data,
    onEnter: (entity: T, data: PhiniteStateMachine.States.StateData) => onEnterChain.forEach(fn => fn!(entity, data)),
    onUpdate: (entity: T, data: PhiniteStateMachine.States.StateData) => onUpdateChain.forEach(fn => fn!(entity, data)),
  }

  return mergedState as PhiniteStateMachine.States.State<T>;
}
