/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ServiceOption {
  enableTimeTravel: boolean;
}

export interface Action {
  serviceName: string;
  actionName: string;
  payload?: any;
  launch?: LaunchAction;
}

export interface ServiceApi {
  initialState: {
    [serviceName: string]: any;
  };
  actions: {
    [serviceName: string]: {
      [actionName: string]: ActionCreator;
    };
  };
  reducer: Reducer;
}

export interface ActionFunctionContext {
  state: any;
  actions: {
    [actionName: string]: ActionCreator;
  };
  launch: LaunchAction;
}

export type ActionFunction = (
  context: ActionFunctionContext,
  payload?: any
) => any;

export interface Service {
  name: string;
  initialState: any;
  actions: {
    [actionName: string]: ActionFunction;
  };
}

export type ActionCreator = (payload?: any) => Action;

export type LaunchAction = (ActionCreator: any) => void;

export type LaunchDispatch = [any, (action: Action) => void];

export interface LaunchContext {
  state: any;
  actions: {
    [serviceName: string]: {
      [actionName: string]: ActionCreator;
    };
  };
  launch: LaunchAction;
}

export interface ActionFunctions {
  [serviceName: string]: {
    [actionName: string]: ActionFunction;
  };
}

export interface ActionCreators {
  [serviceName: string]: {
    [actionName: string]: ActionCreator;
  };
}

export type Reducer = (state: any, action: Action) => any;
