import { useContext, useMemo } from "react";
import Context from "../components/Context";
import { LaunchContext } from "../types";

/**
 * Returns a `Launch.IO` object containing current `state`, `actions`, and the `launch` function.
 *
 * `state` is an object that will contain the full application state.
 * These can be accessed via the name of the service along with the associating state property.
 * For example, `state.[Service Name].[Service State Property]`
 *
 * `actions` is an object that will contain the full application launch actions.
 * These can be accessed via the name of the service along with the associating action.
 * For example, `actions.[Service Name].[Launch Action]`
 *
 * `launch` is a function that takes the return value from invoking the launch action associated with the service action.
 * In turn, the service function will fire and this will update state and re-render your React components.
 * For example, `launch(actions.[Service Name].[Launch Action]())`
 *
 * @return {{state: Object, actions: Object, launch: Function}} A `Launch.IO` object containing the current `state`, and object of service `actions` functions, and a `launch` function
 */
const useLaunch = (): LaunchContext => {
  const context = useContext(Context);
  const actions = useMemo(() => {
    return Object.keys(context.actions).reduce((boundActions, serviceName) => {
      boundActions[serviceName] = Object.keys(
        context.actions[serviceName]
      ).reduce((serviceActions, serviceActionName) => {
        serviceActions[serviceActionName] = (...args) =>
          context.dispatch(
            context.actions[serviceName][serviceActionName](...args)
          );
        return serviceActions;
      }, {});

      return boundActions;
    }, {});
  }, [context.actions, context.dispatch]);
  return {
    state: context.state,
    actions,
    launch: context.dispatch,
  };
};

export default useLaunch;
