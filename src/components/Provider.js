import React from "react";
import PropTypes from "prop-types";
import Context from "./Context";
import useLibraryReducer from "../hooks/useLibraryReducer";

const Provider = ({ serviceApi, children }) => {
  const [state, dispatch] = useLibraryReducer(
    serviceApi.reducer,
    serviceApi.initialState
  );

  return (
    <Context.Provider value={{ state, actions: serviceApi.actions, dispatch }}>
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  serviceApi: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default Provider;
