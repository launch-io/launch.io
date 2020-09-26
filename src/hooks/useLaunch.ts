import { useContext, useMemo } from "react";
import Context from "../components/Context";
import { LaunchContext } from "../types";

/**
 * Returns a `Launch.IO` object containing current `state`, and launch `actions`.
 *
 * `state` is an object that will contain the full application state.
 * These can be accessed via the name of the service along with the associating state property.
 * For example, `state.[ServiceName].[ServiceStateProperty]`
 *
 * `actions` is an object that will contain the full application launch actions.
 * These can be accessed via the name of the service along with the associating action.
 * For example, `actions.[ServiceName].[LaunchAction]`
 *
 * @return {{state: Object, actions: Object }} A `Launch.IO` object containing the current `state`, and object of launch `actions`
 */
const useLaunch = (): LaunchContext => {
  const context = useContext(Context);
  const actions = useMemo(() => {
    return Object.keys(context.actions).reduce(
      (boundLaunchActions, serviceName) => {
        boundLaunchActions[serviceName] = Object.keys(
          context.actions[serviceName]
        ).reduce((serviceActions, serviceActionName) => {
          serviceActions[serviceActionName] = (...args) =>
            context.dispatch(
              context.actions[serviceName][serviceActionName](...args)
            );
          return serviceActions;
        }, {});

        return boundLaunchActions;
      },
      {}
    );
  }, [context.actions, context.dispatch]);
  return {
    state: context.state,
    actions,
  };
};

export default useLaunch;
