import { useContext } from "react";
// When launch context changes, try to re-run the selector
// function. If the new selector result !== old selector result
// then trigger a re-render.
import Context from "../components/Context";

export type Selector = <T>({ state }) => T;

export const useLaunchSelector = <T>(selector: Selector): T => {
  const context = useContext(Context);
  if (context && context.state) {
    return selector(context);
  }
  return undefined;
};
