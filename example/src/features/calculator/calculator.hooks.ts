import { useMemo } from "react";
import { useLaunch, useLaunchSelector } from "launch.io";

export const useCalculator = () => {
  const { actions } = useLaunch();
  const state: any = useLaunchSelector(({ state }) => state.calculator);

  return useMemo(() => {
    return {
      ...state,
      ...actions.calculator,
    };
  }, [state, actions.calculator]);
};
