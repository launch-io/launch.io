/* eslint-disable react/prop-types */
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import Context from "./Context";
import useLaunchReducer from "../hooks/useLaunchReducer";
import createServiceApi from "../utils/createServiceApi";
import { LaunchContext, Service, ServiceOptions } from "../types";
import { Observable } from "../utils/Observable";

/**
 * `LaunchProvider` should wrap your `React` application.
 *
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (object of functions) properties.
 * @param {Object} options A `Launch.IO` `ServiceOptions` object.
 * @return `Launch.IO` `LaunchProvider` `React` Component
 * */

let _contextListener: Observable<LaunchContext> = new Observable(null);
export const getContextListener = () => _contextListener;

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

  const contextValue = {
    state,
    actions: serviceApi.actions,
    dispatch,
  };

  getContextListener().update(contextValue);
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default LaunchProvider;
