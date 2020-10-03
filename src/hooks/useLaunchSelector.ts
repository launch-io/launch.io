import {
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
import { getContextListener } from "../components/LaunchProvider";
import { LaunchContext } from "../types";

// export type Selector = <T>(context: LaunchContext) => T;

export const useLaunchSelector = <T>(
  selector: (context: LaunchContext) => T
): T => {
  const selectedStateRef = useRef();
  const [selectedState, setSelectedState] = useState<any>();

  useLayoutEffect(() => {
    selectedStateRef.current = selectedState;
  });

  useLayoutEffect(() => {
    const onContextChange = (context) => {
      const newState = selector(context);
      if (newState !== selectedStateRef.current) {
        setSelectedState(newState);
      }
    };
    const { disconnect } = getContextListener().subscribe(onContextChange);

    return () => {
      disconnect();
    };
  }, []);
  return selectedState;
};
