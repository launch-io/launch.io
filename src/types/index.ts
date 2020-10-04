/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The `Launch.IO` configuration options available for use with `ServiceApi`.
 */
export interface ServiceOptions {
  /** Controls whether Launch.IO records actions and allows to step forward and back in time. */
  enableTimeTravel: boolean;
}

/**
 * The object returned from an `LaunchAction` is used to determine which `ServiceAction` to call.
 */
export interface Action {
  /** Name of service with the action that was launched. */
  serviceName: string;
  /** Name of the service action being launched. */
  actionName: string;
  /** Object containing values required for the service action function to consume. */
  payload?: any;
  /** Function to launch actions. */
  launch?: Launcher;
}

/**
 * The object that is subsequently passed along to the `React.Context`.
 */
export interface ServiceApi {
  /** Combined state of all services. */
  initialState: {
    [serviceName: string]: any;
  };
  /** Combined `LaunchActions` of all sevices. */
  actions: {
    [serviceName: string]: {
      [actionName: string]: LaunchAction;
    };
  };
  /** Pure function used to return new state. */
  createReducer: any;
}

/**
 * The first parameter received in a `ServiceAction` function.
 */
export interface ServiceActionContext {
  /** The current state of the service for which a function was launched. */
  state: any;
  /** Object containing launch actions for the service. */
  actions: {
    [actionName: string]: LaunchAction;
  };
}

/**
 * Represents a slice of your application `state` and contains `actions` to change said `state`.
 */
export interface Service {
  /** Name of the service. */
  name: string;
  /** Initial state of the service. */
  initialState: any;
  /** Functions that are used to change state within the service. */
  actions: {
    [actionName: string]: ServiceAction;
  };
}

/**
 * Return object when using the `Launch.IO` `useLaunch` React hook.
 */
export interface LaunchContext {
  /** Current state of the Launch.IO application. */
  state: any;
  /** Object containing access to all launch actions for each service. */
  actions: {
    [serviceName: string]: {
      [actionName: string]: LaunchAction;
    };
  };
  dispatch: (action: any) => void;
}

/**
 * Object containing all service actions.
 */
export interface ServiceActions {
  [serviceName: string]: {
    [actionName: string]: ServiceAction;
  };
}

/**
 * Object containing all launch actions.
 */
export interface LaunchActions {
  [serviceName: string]: {
    [actionName: string]: LaunchAction;
  };
}

/**
 * An function abstraction created for each service action by `Launch.IO`.
 */
export type LaunchAction = (payload?: any) => Action;

/**
 * A function declared within actions for each service.
 */
export type ServiceAction = (
  context: ServiceActionContext,
  payload?: any
) => any;

/**
 * `Launch.IO` function to launch other service actions.
 */
export type Launcher = (action: Action) => void;

/**
 * Return value for the `Launch.IO` custom reducer.
 */
export type LaunchDispatch = [any, (action: Action) => void];

/**
 * Pure function used to return new state.
 */
export type Reducer = (state: any, action: Action) => any;
