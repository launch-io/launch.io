import { useMemo } from "react";
import { useLaunch, useLaunchSelector } from "launch.io";

export const useCalculator = () => {
  const { actions, state } = useLaunch();

  return useMemo(() => {
    return {
      ...state.calculator,
      ...actions.calculator,
    };
  }, [state, actions.calculator]);
};
