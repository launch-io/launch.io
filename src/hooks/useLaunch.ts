import { useCallback, useLayoutEffect, useRef, useState } from "react";
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
export const useLaunch = (): LaunchContext => {
  const [context, setContext] = useState(() => getContextListener().snapshot());
  useContextListener(setContext);

  return {
    state: context.state,
    actions: context.actions,
    dispatch: context.dispatch,
  };
};

export const useLaunchSelector = <T>(
  selector: (context: LaunchContext) => T
): T => {
  const selectedStateRef = useRef();
  const selectorRef = useRef(selector);
  const [selectedState, setSelectedState] = useState<any>(() =>
    selector(getContextListener().snapshot())
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

export const useLaunchService = (service: string) => {
  const state = useLaunchSelector(({ state }) => state[service]);
  const actions = useLaunchSelector(({ actions }) => actions[service]);

  return {
    ...state,
    ...actions,
  };
};
