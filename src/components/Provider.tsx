/* eslint-disable react/prop-types */
import React from "react";
import Context from "./Context";
import useLaunchReducer from "../hooks/useLaunchReducer";

const Provider = ({ serviceApi, children }) => {
  const [state, dispatch] = useLaunchReducer(
    serviceApi.reducer,
    serviceApi.initialState
  );

  return (
    <Context.Provider value={{ state, actions: serviceApi.actions, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
