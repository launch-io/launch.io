import history from "../services/history";
import { LaunchOptions, Service, ServiceApi } from "../types";
import createReducer from "./createReducer";

const TIME_TRAVEL_HISTORY_LIMIT = 50;

/**
 * Takes an `array` of application services and creates a Launch.IO service API abstraction for the Launch.IO Provider component.
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (`object` of `functions`) properties.
 * @param {Object} options A `Launch.IO` `LaunchOptions` object.
 * @param {Boolean} options.enableTimeTravel Enable Launch.IO Time Travel Debugging.
 * @param {Boolean} options.timeTravelHistoryLimit Number of Launch.IO time travel actions that are stored in history.
 */
const createServiceApi = (
  services: Service[],
  options: LaunchOptions
): ServiceApi => {
  const servicesToProcess: Service[] = [
      ...services,
      ...(options.enableTimeTravel ? [history] : []),
    ],
    initialState = {};

  if (!options.timeTravelHistoryLimit) {
    options.timeTravelHistoryLimit = TIME_TRAVEL_HISTORY_LIMIT;
  }

  const allActions = servicesToProcess.reduce(
    (allServices, service) => {
      if (!service.name) {
        throw new Error(
          `[Launch.IO]: all services must contain a name property.`
        );
      }
      if (!service.initialState) {
        throw new Error(
          `[Launch.IO]: ${service.name} must contain an initialState object.`
        );
      }
      if (!service.actions) {
        throw new Error(`[Launch.IO]: ${service.name} must contain actions.`);
      }
      if (allServices.launchActions[service.name]) {
        throw new Error(
          `[Launch.IO]: Service with a name of ${service.name} already exists.`
        );
      }

      initialState[service.name] = service.initialState;

      const allServiceActions = Object.keys(service.actions).reduce(
        (actions, actionKey) => {
          actions.launchActionFunctions[actionKey] = (payload) => ({
            serviceName: service.name,
            actionName: actionKey,
            payload,
          });
          actions.serviceActionFunctions[actionKey] =
            service.actions[actionKey];
          return actions;
        },
        { launchActionFunctions: {}, serviceActionFunctions: {} }
      );

      allServices.launchActions[service.name] =
        allServiceActions.launchActionFunctions;
      allServices.serviceActions[service.name] =
        allServiceActions.serviceActionFunctions;

      return allServices;
    },
    { launchActions: {}, serviceActions: {} }
  );

  return {
    initialState,
    actions: allActions.launchActions,
    createReducer: (launcher) => {
      return createReducer(
        allActions.launchActions,
        allActions.serviceActions,
        launcher,
        options
      );
    },
  };
};

export default createServiceApi;
