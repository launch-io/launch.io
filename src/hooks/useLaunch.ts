import { useState } from "react";
import {
  getContextListener,
  useContextListener,
} from "../components/LaunchProvider";
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
  const [context, setContext] = useState(() => getContextListener().snapshot());
  useContextListener(setContext);

  return {
    state: context.state,
    actions: context.actions,
    dispatch: context.dispatch,
  };
};

export default useLaunch;
