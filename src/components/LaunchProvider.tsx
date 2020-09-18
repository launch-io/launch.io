/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import Context from "./Context";
import useLaunchReducer from "../hooks/useLaunchReducer";
import createServiceApi from "../utils/createServiceApi";
import { Service, ServiceOptions } from "../types";

/**
 * `LaunchProvider` should wrap your `React` application.
 *
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (object of functions) properties.
 * @param {Object} options A `Launch.IO` `ServiceOptions` object.
 * @return `Launch.IO` `LaunchProvider` `React` Component
 * */
const LaunchProvider: React.FC<{
  services: Service[];
  options: ServiceOptions;
  children: any;
}> = ({ services, options, children }) => {
  const serviceApi = useMemo(() => {
    return createServiceApi(services, options);
  }, [services, options]);

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

export default LaunchProvider;
