import { useContext } from "react";
import Context from "../components/Context";

export default () => {
  const context = useContext(Context);

  return {
    state: context.state,
    actions: context.actions,
    launch: context.dispatch,
  };
};
