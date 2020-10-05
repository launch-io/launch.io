/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LaunchActions, ServiceActions, Action } from "../types";
import history from "../services/history";
import { bindActions } from "../utils/initializeLaunch";

const reducer = (
  launchActions: LaunchActions,
  serviceActions: ServiceActions,
  dispatch,
  state: any,
  action: Action
): any => {
  const serviceAction = serviceActions[action.serviceName][action.actionName];
  let newState = { ...state };

  const boundActions = bindActions(launchActions, dispatch);
  if (action.serviceName === history.name) {
    newState = serviceAction(
      {
        state,
        actions: boundActions[history.name],
      },
      { serviceActions, boundActions }
    );
    return newState;
  }

  const updatedState = serviceAction(
    {
      state: state[action.serviceName],
      actions: boundActions[action.serviceName],
    },
    action.payload
  );

  if (updatedState && !checkIsPromise(updatedState)) {
    newState[action.serviceName] = updatedState;
    newState._history = history.actions.add(
      {
        state,
        actions: boundActions[history.name],
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
  launchActions: LaunchActions,
  serviceActions: ServiceActions,
  dispatch
) => (state: any, action: Action): any => {
  return reducer(launchActions, serviceActions, dispatch, state, action);
};

const checkIsPromise = (value: any) => {
  return (
    !!value &&
    (typeof value === "object" || typeof value === "function") &&
    typeof value.then === "function"
  );
};
