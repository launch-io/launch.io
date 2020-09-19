# ![Launch.IO Logo](../../logo/logo-small.png) `useLaunch()`

Returns a `Launch.IO` object containing current `state`, `actions`, and the `launch` function. [LaunchProvider](./launchProvider.md) creates an abstraction for `state` and `actions` from the `array` of [Services](./service.md) that were provided.

### Returns

`state` (_Object_): Contains the current application state across all services provided. You can access service state via the name of the service along with the associating state property. For example, `state.[Service Name].[Service State Property]`.

`actions` (_Object_): Contains the application action functions across all services provided. You can access actions via the name of the service along with the associating action. For example, `actions.[Service Name].[Service Action]`. These action functions may take a `payload` (_Object_).

`launch` (_Function_): Takes the return value from invoking an action function associated with the service action. In turn, the service function will fire and this will update state and re-render your React components. For example, `launch(actions.[Service Name].[Service Action](payload))`

### Example

```javascript
import React from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const stepValue = 2;
  const { state, actions, launch } = useLaunch();

  const handleIncrease = () => {
    launch(actions.calculator.increase(stepValue));
  };

  const handleDecrease = () => {
    launch(actions.calculator.decrease(stepValue));
  };

  return (
    <div>
      <p>Value: {state.calculator.value}</p>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
      <button type="button" onClick={handleDecrease}>
        Decrease
      </button>
    </div>
  );
};
```
