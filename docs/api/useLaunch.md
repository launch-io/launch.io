# ![Launch.IO Logo](../../logo/logo-small.png) `useLaunch(...)`

Back to [API Reference](./index.md).

---

A React hook that takes a `selector` function. The `selector` function receives a context argument and returns an object. The `selector` function should return `state` and/or launch `actions` from [Services](./service.md).

`const selection = useLaunch({ state, actions} => ({ ... }));`

[initializeLaunch](./initializeLaunch.md) creates an abstraction for the `state` and launch `actions` properties from the `array` of [Services](./service.md) that were provided.

### `selector` Context

`state` **object**

Contains the current application state across all services provided. You can access service state via the name of the service along with the associating state property. For example, `state.[ServiceName].[ServiceStateProperty]`.

`actions` **object**

Contains the application launch actions across all services provided. You can access launch actions via the name of the service along with the associating action. For example, `actions.[ServiceName].[LaunchAction]`. These actions may take a `payload` `object`.

### Example

```javascript
import React from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const calculatorStep = 2;
  const state = useLaunch(({ state }) => state.calculator);
  const actions = useLaunch(({ actions }) => actions.calculator);

  const handleIncrease = () => {
    actions.increase(calculatorStep);
  };

  const handleDecrease = () => {
    actions.decrease(calculatorStep);
  };

  return (
    <div>
      <p>Value: {state.value}</p>
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
