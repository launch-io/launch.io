import { useMemo } from "react";
import { useLaunchSelector } from "launch.io";

export const useCalculator = () => {
  const actions = useLaunchSelector(({ actions }) => actions.calculator);
  const state: any = useLaunchSelector(({ state }) => state.calculator);
  return useMemo(() => {
    return {
      ...state,
      ...actions,
    };
  }, [state, actions]);
};
