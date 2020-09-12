import { useContext } from "react";
import Context from "../components/Context";
import { LaunchContext } from "../types";

/**
 * Returns a Launch.IO object containing current state, actions, and the launch function.
 *
 * State is an object that will contain your full application state, across all services provided,
 * and you can access service state via the name of the service.
 * For example, state.[Service Name].[Service State]
 *
 * Actions is an object that will contain your full application action functions, across all services provided,
 * and you can access actions via the name of the service.
 * For example, state.[Service Name].[Service Action]
 *
 * Launch is a function that takes the return value from invoking a Service Action function.
 * In turn, this will update state and re-render your React components.
 * For example, launch(actions.[Service Name].[Service Action]())
 *
 * @return {{state: Object, actions: Object, launch: Function}} A Launch.IO object containing the current state, and object of service actions functions, and a launch function
 */
const useLaunch = (): LaunchContext => {
  const context = useContext(Context);

  return {
    state: context.state,
    actions: context.actions,
    launch: context.dispatch,
  };
};

export default useLaunch;
