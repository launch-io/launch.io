import { useLaunch } from "launch.io";

export default () => {
  const { actions, launch } = useLaunch();

  const rewind = () => {
    launch(actions._history.stepBack());
  };

  const fastForward = () => {
    launch(actions._history.stepForward());
  };

  return {
    rewind,
    fastForward,
  };
};
