import { LaunchActions, Launcher } from "../types";

export default (
  unboundActions: LaunchActions,
  launcher: Launcher
): LaunchActions => {
  return Object.keys(unboundActions).reduce((boundActions, serviceName) => {
    boundActions[serviceName] = Object.keys(unboundActions[serviceName]).reduce(
      (serviceActions, serviceActionName) => {
        serviceActions[serviceActionName] = (...args) =>
          launcher(unboundActions[serviceName][serviceActionName](...args));
        return serviceActions;
      },
      {}
    );

    return boundActions;
  }, {});
};
