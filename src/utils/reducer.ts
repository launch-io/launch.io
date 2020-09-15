/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionCreators, ActionFunctions, Action } from "../types";
import history from "../services/history";
import { getActionFunction } from "../utils/helpers";

const reducer = (
  actionCreators: ActionCreators,
  actionFunctions: ActionFunctions,
  state: any,
  action: Action
): any => {
  const actionFunction = getActionFunction(actionFunctions, action);
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
        newState,
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

export default (
  actionCreators: ActionCreators,
  actionFunctions: ActionFunctions
) => (state: any, action: Action): any => {
  return reducer(actionCreators, actionFunctions, state, action);
};
