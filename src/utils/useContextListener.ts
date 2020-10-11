import { useLayoutEffect } from "react";
import ctx from "./context";

export default (cb) => {
  useLayoutEffect(() => {
    const { disconnect } = ctx.subscribe(cb);

    return () => {
      disconnect();
    };
  }, [cb]);
};
