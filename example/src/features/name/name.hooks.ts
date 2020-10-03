import { useEffect } from "react";
import { useLaunchSelector } from "launch.io";

// this example doesn't use useLaunchSelector
// and instead memoizes in the consuming hook
export const useName = () => {
  const actions = useLaunchSelector(({ actions }) => actions.name);
  const state: any = useLaunchSelector(({ state }) => state.name);

  useEffect(() => {
    actions.fetchName();
  }, [actions]);

  return {
    ...actions,
    ...state,
  };
};
