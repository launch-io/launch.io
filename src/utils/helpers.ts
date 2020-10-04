/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action, LaunchAction, ServiceActions, Launcher } from "../types";

const getNewState = (
  initialState: any,
  actions: Action[],
  serviceActions: ServiceActions,
  launchActions: any
): any => {
  const newState = { ...initialState };
  console.log("serviceActions", serviceActions, actions, launchActions);

  actions.forEach((action) => {
    console.log("REPLAY action", action);
    const serviceAction = serviceActions[action.serviceName][action.actionName];
    newState[action.serviceName] = serviceAction(
      {
        state: newState[action.serviceName],
        actions: launchActions[action.serviceName],
      },
      action.payload
    );
  });

  return newState;
};

export { getNewState };
