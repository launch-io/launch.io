/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Action, LaunchActions,ServiceActions } from "../types";

export default (
  initialState: any,
  actions: Action[],
  serviceActions: ServiceActions,
  launchActions: LaunchActions
): any => {
  const newState = { ...initialState };

  actions.forEach((action) => {
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
