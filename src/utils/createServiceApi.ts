import createReducer from "./reducer";
import history from "../services/history";
import { Service, ServiceOptions, ServiceApi } from "../types";

/**
 * Takes an `array` of application services and creates a Launch.IO service API abstraction for the Launch.IO Provider component.
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (`object` of `functions`) properties.
 * @param {Object} options A `Launch.IO` `ServiceOptions` object.
 * @param {Boolean} options.enableTimeTravel Enable Launch.IO Time Travel Debugging.
 */
const createServiceApi = (
  services: Service[],
  options: ServiceOptions = { enableTimeTravel: false }
): ServiceApi => {
  const servicesToProcess: Service[] = [
      ...services,
      ...(options.enableTimeTravel ? [history] : []),
    ],
    initialState = {};

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
    createReducer: (dispatch) => {
      return createReducer(
        allActions.launchActions,
        allActions.serviceActions,
        dispatch
      );
    },
  };
};

export default createServiceApi;
