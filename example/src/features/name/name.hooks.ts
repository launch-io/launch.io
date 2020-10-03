import { useEffect, useMemo } from "react";
import { useLaunch } from "launch.io";

// this example doesn't use useLaunchSelector
// and instead memoizes in the consuming hook
export const useName = () => {
  const { state, actions } = useLaunch();

  useEffect(() => {
    actions.name.fetchName();
  }, [actions.name]);

  return useMemo(() => {
    return {
      ...state.name,
      ...actions.name,
    };
  }, [state.name, actions.name]);

  // If we didn't `useMemo` and did this instead
  // we would rerender every context change
  // return {
  //   ...state.name,
  //   ...actions.name,
  // };
};
