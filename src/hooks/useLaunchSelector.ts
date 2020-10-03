import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// When launch context changes, try to re-run the selector
// function. If the new selector result !== old selector result
// then trigger a re-render.
import {
  getContextListener,
  useContextListener,
} from "../components/LaunchProvider";
import { LaunchContext } from "../types";

// export type Selector = <T>(context: LaunchContext) => T;

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
