/* eslint-disable react/prop-types */
import React from "react";
import Context from "./Context";
import useLaunchReducer from "../hooks/useLaunchReducer";

/**
 * This component should wrap your application and the Launch.IO createServiceApi should be
 * used in conjunction to populate the serviceApi property of this component.
 *
 * @return Launch.IO Provider React Component
 * */
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
