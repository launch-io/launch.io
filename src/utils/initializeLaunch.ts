/* eslint-disable react/prop-types */
import createServiceApi from "./createServiceApi";
import bindActions from "./bindActions";
import { Service, LaunchOptions, Action } from "../types";
import ctx from "./context";

/**
 * Initialize a React application with Launch.IO.
 *
 * @param {Array} services An `array` of application services.  Each service object will consist of `name` (`string`), `initialState` (`object`), and `actions` (object of functions) properties.
 * @param {Object} options A `Launch.IO` `LaunchOptions` object.
 * */
export const initializeLaunch = (
  services: Service[],
  options: LaunchOptions = { enableTimeTravel: false }
) => {
  const serviceApi = createServiceApi(services, options);

  const launcher = (action: Action) => {
    const prevCtx = ctx.snapshot();
    const newState = serviceApi.createReducer(launcher)(prevCtx.state, action);
    if (newState !== prevCtx.state) {
      ctx.update({
        ...prevCtx,
        state: newState,
      });
    }
  };

  const contextValue = {
    state: serviceApi.initialState,
    actions: bindActions(serviceApi.actions, launcher),
    launcher,
  };

  ctx.update(contextValue);
};
