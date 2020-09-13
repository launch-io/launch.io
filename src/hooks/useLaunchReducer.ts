/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useReducer, useCallback } from "react";
import { Reducer, LaunchDispatch } from "../types";

export default (reducer: Reducer, initialState: any): LaunchDispatch => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const customDispatch = useCallback((action) => {
    dispatch({ ...action, launch: dispatch });
  }, []);

  return [state, customDispatch];
};
