import reducer from "./reducer";
import history from "../services/history";

export default (services, options = {}) => {
  const allServices = [
    ...services,
    ...(options.enableTimeTravel ? [history] : []),
  ];
  let initialState = {},
    actions = {},
    actionFunctions = {};

  allServices.forEach((service, index) => {
    let serviceActions = {},
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
    if (actions[service.name]) {
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

    actions[service.name] = serviceActions;
    actionFunctions[service.name] = serviceActionFunctions;
  });

  return {
    initialState,
    actions,
    reducer: reducer(actions, actionFunctions),
  };
};
