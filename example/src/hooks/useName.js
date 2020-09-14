import { useEffect } from "react";
import { useLaunch } from "launch.io";

export default () => {
  const { state, actions, launch } = useLaunch();

  useEffect(() => {
    launch(actions.name.fetchName());
  }, [launch, actions.name]);

  const updateName = (updates) => {
    launch(actions.name.updateName(updates));
  };

  return {
    state: state.name,
    updateName,
  };
};
