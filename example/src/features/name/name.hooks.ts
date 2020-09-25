import { useEffect, useMemo } from "react";
import { useLaunch } from "launch.io";

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
};
