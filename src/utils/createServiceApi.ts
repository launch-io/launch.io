import reducer from "./reducer";
import history from "../services/history";
import {
  Service,
  ServiceOptions,
  ServiceApi,
  LaunchActions,
  ServiceActions,
} from "../types";

/**
 * Takes an `array` of application services and creates a Launch.IO service API abstraction for the Launch.IO Provider component.
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (object of functions) properties.
 * @param {Object} options A `Launch.IO` `ServiceOptions` object.
 * @param {Boolean} options.enableTimeTravel Enable Launch.IO Time Travel Debugging.
 */
const createServiceApi = (
  services: Service[],
  options: ServiceOptions = { enableTimeTravel: false }
): ServiceApi => {
  const allServices: Service[] = [
    ...services,
    ...(options.enableTimeTravel ? [history] : []),
  ];
  const initialState = {},
    launchActions: LaunchActions = {},
    serviceActions: ServiceActions = {};

  allServices.forEach((service, index) => {
    const launcActionFunctions = {},
      serviceActionFunctions = {};

    if (!service.name) {
      throw new Error(
        `[Launch.IO]: service at [${index}] must contain a name property.`
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
    if (launchActions[service.name]) {
      throw new Error(
        `[Launch.IO]: Service with a name of ${service.name} already exists.`
      );
    }

    initialState[service.name] = service.initialState;

    Object.keys(service.actions).forEach((actionKey) => {
      launcActionFunctions[actionKey] = (payload) => ({
        serviceName: service.name,
        actionName: actionKey,
        payload,
      });
      serviceActionFunctions[actionKey] = service.actions[actionKey];
    });

    launchActions[service.name] = launcActionFunctions;
    serviceActions[service.name] = serviceActionFunctions;
  });

  return {
    initialState,
    actions: launchActions,
    reducer: reducer(launchActions, serviceActions),
  };
};

export default createServiceApi;
