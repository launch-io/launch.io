import { useContext } from "react";
import Context from "../components/Context";

/** Returns a Launch.IO object containing current state, actions, and launch. */
const useLaunch = () => {
  const context = useContext(Context);

  return {
    state: context.state,
    actions: context.actions,
    launch: context.dispatch,
  };
};

export default useLaunch;
