/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ServiceActionContext, ServiceActions } from "../types";
import { getNewState } from "../utils/helpers";

const initialState = {
  initialGlobalState: null,
  past: [],
  future: [],
};

const actions = {
  stepBack: (
    { state, actions }: ServiceActionContext,
    { serviceActions, boundActions }
  ): any => {
    if (state._history.past.length === 0) {
      return state;
    }

    const previous = state._history.past[state._history.past.length - 1],
      newPast = state._history.past.slice(0, state._history.past.length - 1),
      newState = getNewState(
        { ...state._history.initialGlobalState },
        newPast,
        serviceActions,
        boundActions
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
    { state, actions }: ServiceActionContext,
    { serviceActions, boundActions }
  ): any => {
    if (state._history.future.length === 0) {
      return state;
    }

    const next = state._history.future[0],
      newFuture = state._history.future.slice(1),
      newPast = [...state._history.past, next],
      newState = getNewState(
        { ...state._history.initialGlobalState },
        newPast,
        serviceActions,
        boundActions
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
  add: ({ state }: ServiceActionContext, newAction: any): any => {
    return {
      initialGlobalState: state._history.initialGlobalState
        ? state._history.initialGlobalState
        : state,
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
