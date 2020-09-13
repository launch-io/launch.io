/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The `Launch.IO` configuration options available for use with `ServiceApi`.
 */
export interface ServiceOptions {
  /** Controls whether Launch.IO records actions and allows to step forward and back in time. */
  enableTimeTravel: boolean;
}

/**
 * The object returned from an `ActionCreator` is used to determine which `ActionFunction` to call.
 */
export interface Action {
  /** Name of service with the action that was launched. */
  serviceName: string;
  /** Name of the service action being launched. */
  actionName: string;
  /** Object containing values required for the service action function to process. */
  payload?: any;
  /** Function to launch other service actions. */
  launch?: LaunchAction;
}

/**
 * The object that is subsequently passed along to the `React.Context`.
 */
export interface ServiceApi {
  /** Combined state of all services. */
  initialState: {
    [serviceName: string]: any;
  };
  /** Combined functions of all sevices. */
  actions: {
    [serviceName: string]: {
      [actionName: string]: ActionCreator;
    };
  };
  /** Pure function used to return new state. */
  reducer: Reducer;
}

/**
 * The first parameter received in a service action function (`ActionFunction`).
 */
export interface ActionFunctionContext {
  /** The current state of the service for which a function was launched. */
  state: any;
  /** Object containing functions, for the service, that can be launched. */
  actions: {
    [actionName: string]: ActionCreator;
  };
  /** Function to launch service actions. */
  launch: LaunchAction;
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
    [actionName: string]: ActionFunction;
  };
}

/**
 * Return object when using the `Launch.IO` `useLaunch` React hook.
 */
export interface LaunchContext {
  /** Current state of the Launch.IO application. */
  state: any;
  /** Object containing access to all services and action functions for each service. */
  actions: {
    [serviceName: string]: {
      [actionName: string]: ActionCreator;
    };
  };
  /** Function to launch service actions. */
  launch: LaunchAction;
}

/**
 * Object containing all service action functions.
 * Action Function is a function declared within `actions` for each service.
 */
export interface ActionFunctions {
  [serviceName: string]: {
    [actionName: string]: ActionFunction;
  };
}

/**
 * Object containing all service action creators.
 * Action Creator is an abstraction created for each service action function by `Launch.IO`.
 */
export interface ActionCreators {
  [serviceName: string]: {
    [actionName: string]: ActionCreator;
  };
}

/**
 * An function abstraction created for each service action function (`ActionFunction`) by `Launch.IO`.
 */
export type ActionCreator = (payload?: any) => Action;

/**
 * A function declared within `actions` for each service.
 */
export type ActionFunction = (
  context: ActionFunctionContext,
  payload?: any
) => any;

/**
 * `Launch.IO` function to launch other service actions.
 */
export type LaunchAction = (ActionCreator: any) => void;

/**
 * Return value for the `Launch.IO` custom reducer.
 */
export type LaunchDispatch = [any, (action: Action) => void];

/**
 * Pure function used to return new state.
 */
export type Reducer = (state: any, action: Action) => any;
