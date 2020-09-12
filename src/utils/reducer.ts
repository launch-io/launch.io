/* eslint-disable @typescript-eslint/no-explicit-any */
import history from "../services/history";
import { ActionCreators, ActionFunctions, Action } from "../types";

export default (
  actionCreators: ActionCreators,
  actionFunctions: ActionFunctions
) => (state: any, action: Action): any => {
  const service = actionFunctions[action.serviceName],
    actionFunction = service[action.actionName];
  let newState = { ...state };

  if (action.serviceName === history.name) {
    newState = actionFunction(
      { state, actions: actionCreators[history.name], launch: action.launch },
      actionFunctions
    );
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
      {
        state,
        actions: actionCreators[history.name],
        launch: action.launch,
      },
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
