import { useMemo } from "react";
import { useLaunch } from "launch.io";

export const useCalculator = () => {
  const { state, actions } = useLaunch();

  return useMemo(() => {
    return {
      ...state.calculator,
      ...actions.calculator,
    };
  }, [state.calculator, actions.calculator]);
};
