import { useLaunchSelector } from "launch.io";

export const useCalculator = () => {
  const actions = useLaunchSelector(({ actions }) => actions.calculator);
  const state: any = useLaunchSelector(({ state }) => state.calculator);

  return {
    ...state,
    ...actions,
  };
};
