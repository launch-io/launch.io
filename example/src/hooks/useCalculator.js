import { useLaunch } from "launch.io";

export default () => {
  const { state, actions, launch } = useLaunch();

  const increase = () => {
    launch(actions.calculator.increase());
  };

  const decrease = () => {
    launch(actions.calculator.decrease());
  };

  return {
    state: state.calculator,
    increase,
    decrease,
  };
};
