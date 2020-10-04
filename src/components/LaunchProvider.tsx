/* eslint-disable react/prop-types */
import { useLayoutEffect, useMemo } from "react";
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

let _ctx: Observable<LaunchContext> = new Observable(null);
export const getContextListener = () => _ctx;

export const initializeLaunch = (services, options) => {
  const serviceApi = createServiceApi(services, options);

  const dispatch = (action) => {
    let prevCtx = _ctx.snapshot();
    let newState = serviceApi.createReducer(dispatch)(prevCtx.state, action);
    if (newState !== prevCtx.state) {
      _ctx.update({
        ...prevCtx,
        state: newState,
      });
    }
  };

  const contextValue = {
    state: serviceApi.initialState,
    actions: bindActions(serviceApi.actions, dispatch),
    dispatch,
  };

  _ctx.update(contextValue);
};

export const useContextListener = (cb) => {
  useLayoutEffect(() => {
    const { disconnect } = getContextListener().subscribe(cb);

    return () => {
      disconnect();
    };
  }, [cb]);
};

export const bindActions = (unboundActions, dispatch) => {
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
