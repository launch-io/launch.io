import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ctx from "../utils/context";
import useContextListener from "../utils/useContextListener";
import { LaunchContext } from "../types";

/**
 * A React hook that takes a `selector` function.  The selector function receives a context, containing `state` and `actions`, and it should return object containing Launch.IO state and/or actions.
 *
 * `const selection = useLaunch({ state, actions} => ({ ... }));`
 *
 * `state` is an object that will contain the full application state.
 * These can be accessed via the name of the service along with the associating state property.
 * For example, `state.[ServiceName].[ServiceStateProperty]`
 *
 * `actions` is an object that will contain the full application launch actions.
 * These can be accessed via the name of the service along with the associating action.
 * For example, `actions.[ServiceName].[LaunchAction]`
 *
 */
export const useLaunch = <T>(selector: (context: LaunchContext) => T): T => {
  const selectedStateRef = useRef();
  const selectorRef = useRef(selector);
  const [selectedState, setSelectedState] = useState<any>(() =>
    selector(ctx.snapshot())
  );

  useLayoutEffect(() => {
    selectedStateRef.current = selectedState;
    selectorRef.current = selector;
  });

  const onContextChange = useCallback((context) => {
    const newState = selectorRef.current(context);
    if (newState !== selectedStateRef.current) {
      setSelectedState(newState);
    }
  }, []);
  useContextListener(onContextChange);

  return selectedState;
};
