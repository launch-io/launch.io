import history from "../services/history";

export default (actionCreators, actionFunctions) => (state, action) => {
  const service = actionFunctions[action.serviceName],
    actionFunction = service[action.actionName];
  let newState = { ...state };

  if (action.serviceName === history.name) {
    newState = actionFunction({ state }, actionFunctions);
    return newState;
  }

  const updatedState = actionFunction(
    {
      state: state[action.serviceName],
      actions: actionCreators[action.serviceName],
      launch: action.launch,
    },
    action.payload
  );

  if (updatedState) {
    newState[action.serviceName] = updatedState;
    newState._history = history.actions.add(
      { state },
      {
        state,
        action: {
          serviceName: action.serviceName,
          actionName: action.actionName,
          payload: action.payload,
        },
      }
    );
    return newState;
  }

  return state;
};
