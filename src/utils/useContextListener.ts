import { useLayoutEffect } from "react";

import { LaunchContext } from "../types";
import ctx from "./context";

export default (callback: (context: LaunchContext) => void): void => {
  useLayoutEffect(() => {
    const { disconnect } = ctx.subscribe(callback);

    return () => {
      disconnect();
    };
  }, [callback]);
};
