import reducer from "./reducer";
import history from "../services/history";
import {
  Service,
  ServiceOptions,
  ServiceApi,
  ActionCreators,
  ActionFunctions,
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
    actionCreators: ActionCreators = {},
    actionFunctions: ActionFunctions = {};

  allServices.forEach((service, index) => {
    const serviceActions = {},
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
      throw new Error(
        `[Launch.IO]: ${service.name} must contain an array of action functions.`
      );
    }
    if (actionCreators[service.name]) {
      throw new Error(
        `[Launch.IO]: Service with a name of ${service.name} already exists.`
      );
    }

    initialState[service.name] = service.initialState;

    Object.keys(service.actions).forEach((actionKey) => {
      serviceActions[actionKey] = (payload) => ({
        serviceName: service.name,
        actionName: actionKey,
        payload,
      });
      serviceActionFunctions[actionKey] = service.actions[actionKey];
    });

    actionCreators[service.name] = serviceActions;
    actionFunctions[service.name] = serviceActionFunctions;
  });

  return {
    initialState,
    actions: actionCreators,
    reducer: reducer(actionCreators, actionFunctions),
  };
};

export default createServiceApi;
