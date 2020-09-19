/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LaunchActions, ServiceActions, Action } from "../types";
import history from "../services/history";
import { getServiceAction } from "../utils/helpers";

const reducer = (
  launchActions: LaunchActions,
  serviceActions: ServiceActions,
  state: any,
  action: Action
): any => {
  const serviceAction = getServiceAction(serviceActions, action);
  let newState = { ...state };

  if (action.serviceName === history.name) {
    newState = serviceAction(
      { state, actions: launchActions[history.name], launch: action.launch },
      serviceActions
    );
    return newState;
  }

  const updatedState = serviceAction(
    {
      state: state[action.serviceName],
      actions: launchActions[action.serviceName],
      launch: action.launch,
    },
    action.payload
  );

  if (updatedState) {
    newState[action.serviceName] = updatedState;
    newState._history = history.actions.add(
      {
        state,
        actions: launchActions[history.name],
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
  launchActions: LaunchActions,
  serviceActions: ServiceActions
) => (state: any, action: Action): any => {
  return reducer(launchActions, serviceActions, state, action);
};
