/* eslint-disable react/prop-types */
import { useLayoutEffect, useMemo } from "react";
import useLaunchReducer from "../hooks/useLaunchReducer";
import createServiceApi from "../utils/createServiceApi";
import { LaunchContext } from "../types";
import { Observable } from "../utils/Observable";

/**
 * `LaunchProvider` should wrap your `React` application.
 *
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (object of functions) properties.
 * @param {Object} options A `Launch.IO` `ServiceOptions` object.
 * @return `Launch.IO` `LaunchProvider` `React` Component
 * */

const _contextListener: Observable<LaunchContext> = new Observable(null);
export const getContextListener = () => _contextListener;

export const useLaunchProvider = (services, options) => {
  const serviceApi = useMemo(() => {
    return createServiceApi(services, options);
  }, [services, options]);

  const [state, dispatch] = useLaunchReducer(
    serviceApi.reducer,
    serviceApi.initialState
  );

  const actions = useMemo(() => {
    return bindActions(serviceApi.actions, dispatch);
  }, [serviceApi.actions, dispatch]);

  const contextValue = {
    state,
    actions,
    dispatch,
  };

  getContextListener().update(contextValue);
};

export const useContextListener = (cb) => {
  useLayoutEffect(() => {
    const { disconnect } = getContextListener().subscribe(cb);

    return () => {
      disconnect();
    };
  }, [cb]);
};

const bindActions = (unboundActions, dispatch) => {
  return Object.keys(unboundActions).reduce(
    (boundLaunchActions, serviceName) => {
      boundLaunchActions[serviceName] = Object.keys(
        unboundActions[serviceName]
      ).reduce((serviceActions, serviceActionName) => {
        serviceActions[serviceActionName] = (...args) =>
          dispatch(unboundActions[serviceName][serviceActionName](...args));
        return serviceActions;
      }, {});

      return boundLaunchActions;
    },
    {}
  );
};
