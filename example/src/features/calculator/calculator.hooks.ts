import { useMemo } from "react";
import { useLaunch, useLaunchSelector } from "launch.io";

export const useCalculator = () => {
  const actions = useLaunchSelector(({ actions }) => actions.calculator);
  const state: any = useLaunchSelector(({ state }) => state.calculator);
  console.log("ACTIONS", actions);
  console.log("STATE", state);
  return useMemo(() => {
    return {
      ...state,
      ...actions,
    };
  }, [state, actions]);
};
