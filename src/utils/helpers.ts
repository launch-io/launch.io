/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Action,
  ActionCreator,
  ActionFunction,
  ActionFunctions,
  LaunchAction,
} from "../types";

const getActionFunction = (
  actionFunctions: ActionFunctions,
  action: Action
): ActionFunction => {
  const service = actionFunctions[action.serviceName];
  return service[action.actionName];
};

const getNewState = (
  initialState: any,
  actions: Action[],
  actionFunctions: ActionFunctions,
  actionCreator: {
    [actionName: string]: ActionCreator;
  },
  launch: LaunchAction
): any => {
  const newState = { ...initialState };

  actions.forEach((action) => {
    const actionFunction = getActionFunction(actionFunctions, action);
    newState[action.serviceName] = actionFunction(
      {
        state: newState[action.serviceName],
        actions: actionCreator,
        launch,
      },
      action.payload
    );
  });

  return newState;
};

export { getActionFunction, getNewState };
