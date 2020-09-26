import { useMemo } from "react";
import { useLaunch } from "launch.io";

export default () => {
  const { actions } = useLaunch();

  return useMemo(() => {
    return {
      ...actions._history,
    };
  }, [actions._history]);
};
