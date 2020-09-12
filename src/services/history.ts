/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActionFunctions,
  ActionCreator,
  Action,
  LaunchAction,
  ActionFunctionContext,
} from "../types";

const initialState = {
  initialGlobalState: null,
  past: [],
  future: [],
};

const getActionFunction = (
  actionFunctions: ActionFunctions,
  action: Action
) => {
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
) => {
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

const actions = {
  stepBack: (
    { state, actions, launch }: ActionFunctionContext,
    actionFunctions: ActionFunctions
  ): any => {
    if (state._history.past.length === 0) {
      return state;
    }

    const previous = state._history.past[state._history.past.length - 1];
    const newPast = state._history.past.slice(
      0,
      state._history.past.length - 1
    );
    const newState = getNewState(
      { ...state._history.initialGlobalState },
      newPast,
      actionFunctions,
      actions,
      launch
    );

    return {
      ...newState,
      _history: {
        ...state._history,
        past: newPast,
        future: [previous, ...state._history.future],
      },
    };
  },
  stepForward: (
    { state, actions, launch }: ActionFunctionContext,
    actionFunctions: ActionFunctions
  ): any => {
    if (state._history.future.length === 0) {
      return state;
    }

    const next = state._history.future[0];
    const newFuture = state._history.future.slice(1);
    const newPast = [...state._history.past, next];
    const newState = getNewState(
      { ...state._history.initialGlobalState },
      newPast,
      actionFunctions,
      actions,
      launch
    );

    return {
      ...newState,
      _history: {
        ...state._history,
        past: newPast,
        future: newFuture,
      },
    };
  },
  add: ({ state }: ActionFunctionContext, newAction: any): any => {
    return {
      initialGlobalState: state._history.initialGlobalState
        ? state._history.initialGlobalState
        : newAction.state,
      past: [...state._history.past, newAction.action],
      future: [],
    };
  },
};

export default {
  name: "_history",
  initialState,
  actions,
};
