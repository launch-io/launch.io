/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Action,
  LaunchAction,
  ServiceAction,
  ServiceActions,
  Launcher,
} from "../types";

const getServiceAction = (
  serviceActions: ServiceActions,
  action: Action
): ServiceAction => {
  const service = serviceActions[action.serviceName];
  return service[action.actionName];
};

const getNewState = (
  initialState: any,
  actions: Action[],
  serviceActions: ServiceActions,
  launchAction: {
    [actionName: string]: LaunchAction;
  },
  launch: Launcher
): any => {
  const newState = { ...initialState };

  actions.forEach((action) => {
    const serviceAction = getServiceAction(serviceActions, action);
    newState[action.serviceName] = serviceAction(
      {
        state: newState[action.serviceName],
        actions: launchAction,
        launch,
      },
      action.payload
    );
  });

  return newState;
};

export { getServiceAction, getNewState };
