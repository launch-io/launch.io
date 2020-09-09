const initialState = {
  initialGlobalState: null,
  past: [],
  future: [],
};

const getFunction = (actionFunctions, action) => {
  const service = actionFunctions[action.serviceName];
  return service[action.actionName];
};

const getNewState = (initialState, actions, actionFunctions) => {
  const newState = { ...initialState };

  actions.forEach((action) => {
    const actionFunction = getFunction(actionFunctions, action);
    newState[action.serviceName] = actionFunction(
      {
        state: newState[action.serviceName],
      },
      action.payload
    );
  });

  return newState;
};

const actions = {
  stepBack: ({ state }, actionFunctions) => {
    if (state._history.past.length === 0) {
      return state;
    }

    const previous = state._history.past[state._history.past.length - 1];
    const newPast = state._history.past.slice(
      0,
      state._history.past.length - 1
    );
    const newState = getNewState(
      { ...state._history.initialGlobalState },
      newPast,
      actionFunctions
    );

    return {
      ...newState,
      _history: {
        ...state._history,
        past: newPast,
        future: [previous, ...state._history.future],
      },
    };
  },
  stepForward: ({ state }, actionFunctions) => {
    if (state._history.future.length === 0) {
      return state;
    }

    const next = state._history.future[0];
    const newFuture = state._history.future.slice(1);
    const newPast = [...state._history.past, next];
    const newState = getNewState(
      { ...state._history.initialGlobalState },
      newPast,
      actionFunctions
    );

    return {
      ...newState,
      _history: {
        ...state._history,
        past: newPast,
        future: newFuture,
      },
    };
  },
  add: ({ state }, newAction) => {
    return {
      initialGlobalState: state.initialGlobalState
        ? state.initialGlobalState
        : newAction.state,
      past: [...state.past, newAction.action],
      future: [],
    };
  },
};

export default {
  name: "_history",
  initialState,
  actions,
};
