# ![Launch.IO Logo](../../logo/logo-small.png) `useLaunch()`

Returns a `Launch.IO` object containing current `state` and launch `actions`. [LaunchProvider](./launchProvider.md) creates an abstraction for `state` and `actions` from the `array` of [Services](./service.md) that were provided.

### Returns **object**

`state` **object**

Contains the current application state across all services provided. You can access service state via the name of the service along with the associating state property. For example, `state.[ServiceName].[ServiceStateProperty]`.

`actions` **object**

Contains the application launch actions across all services provided. You can access launch actions via the name of the service along with the associating action. For example, `actions.[ServiceName].[LaunchAction]`. These actions may take a `payload` `object`.

### Example

```javascript
import React from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const stepValue = 2;
  const { state, actions } = useLaunch();

  const handleIncrease = () => {
    actions.calculator.increase(stepValue);
  };

  const handleDecrease = () => {
    actions.calculator.decrease(stepValue);
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
