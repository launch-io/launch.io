/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { LaunchActions, ServiceActions, Action } from "../types";
import history from "../services/history";

const getBoundLaunchActions = (launch, launchActions) =>
  Object.keys(launchActions).reduce((boundLaunchActions, launchActionName) => {
    boundLaunchActions[launchActionName] = (...args) =>
      launch(launchActions[launchActionName](...args));
    return boundLaunchActions;
  }, {});

const reducer = (
  launchActions: LaunchActions,
  serviceActions: ServiceActions,
  state: any,
  action: Action
): any => {
  const serviceAction = serviceActions[action.serviceName][action.actionName];
  let newState = { ...state };

  if (action.serviceName === history.name) {
    newState = serviceAction(
      {
        state,
        actions: getBoundLaunchActions(
          action.launch,
          launchActions[history.name]
        ),
      },
      serviceActions
    );
    return newState;
  }

  const updatedState = serviceAction(
    {
      state: state[action.serviceName],
      actions: getBoundLaunchActions(
        action.launch,
        launchActions[action.serviceName]
      ),
    },
    action.payload
  );

  if (updatedState) {
    newState[action.serviceName] = updatedState;
    newState._history = history.actions.add(
      {
        state,
        actions: getBoundLaunchActions(
          action.launch,
          launchActions[history.name]
        ),
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
