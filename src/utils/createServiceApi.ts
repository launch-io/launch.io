import reducer from "./reducer";
import history from "../services/history";

/** Takes an array of application services and creates a Launch.IO service API abstraction for the Launch.IO Provider component. */
const createServiceApi = (services, options = { enableTimeTravel: false }) => {
  const allServices = [
    ...services,
    ...(options.enableTimeTravel ? [history] : []),
  ];
  const initialState = {},
    actionCreators = {},
    actionFunctions = {};

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
    if (!service.actions || service.actions.length === 0) {
      throw new Error(
        `[Launch.IO]: ${service.name} must contain an array of actions.`
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
