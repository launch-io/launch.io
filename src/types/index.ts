/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ServiceOption {
  enableTimeTravel: boolean;
}

export interface Action<T> {
  serviceName: string;
  actionName: string;
  payload: T;
}

export interface ServiceApi {
  initialState: {
    [key: string]: any;
  };
  actions: {
    [key: string]: {
      [key: string]: ActionCreator<any>;
    };
  };
  reducer: <T, S>(state: T, action: Action<S>) => T;
}

export type ServiceFunction = (
  context: ServiceFunctionContext,
  payload: any
) => any;

export interface Service {
  name: string;
  initialState: any;
  actions: {
    [key: string]: ServiceFunction;
  };
}

export type ActionCreator<T> = (payload: T) => Action<T>;

export interface LaunchContext<A, L> {
  state: any;
  actions: {
    [key: string]: ActionCreator<A>;
  };
  launch: LaunchAction<L>;
}

export type LaunchAction<T> = (ActionCreator: T) => any;

interface ServiceFunctionContext {
  state: any;
  actions: {
    [key: string]: ActionCreator<any>;
  };
  launch: any;
}
