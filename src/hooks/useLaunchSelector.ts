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
import Context from "../components/Context";
import { getContextListener } from "../components/LaunchProvider";

export type Selector = <T>({ state }) => T;

export const useLaunchSelector = <T>(selector: Selector): T => {
  const selectedStateRef = useRef();
  let [selectedState, setSelectedState] = useState<any>();

  useLayoutEffect(() => {
    selectedStateRef.current = selectedState;
  });

  useLayoutEffect(() => {
    const onContextChange = (context) => {
      let newState = selector(context);
      if (newState !== selectedStateRef.current) {
        setSelectedState(newState);
      }
    };
    let { disconnect } = getContextListener().subscribe(onContextChange);

    return () => {
      disconnect();
    };
  }, []);
  return selectedState;
};
