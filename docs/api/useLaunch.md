# ![Launch.IO Logo](../../logo/logo-small.png) `useLaunch(...)`

A React hook that takes a `selector` function and returns an object, containing `state` and/or launch `actions` from [Services](./service.md), based on the selection within the `selector` function.

`const selection = useLaunch({ state, actions} => ({ ... }));`

[initializeLaunch](./initializeLaunch.md) creates an abstraction for the `state` and `actions` arguments from the `array` of [Services](./service.md) that were provided.

### `selector` Arguments

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
  const calculator = useLaunch(({ state, actions }) => ({
    ...state.calculator,
    ...actions.calculator,
  }));

  const handleIncrease = () => {
    calculator.increase(stepValue);
  };

  const handleDecrease = () => {
    calculator.decrease(stepValue);
  };

  return (
    <div>
      <p>Value: {calculator.value}</p>
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
