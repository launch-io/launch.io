# ![Launch.IO Logo](../../logo/logo-small.png) initializeLaunch

`initializeLaunch` is a function that is used to initialize your React application with Launch.IO. It should be called before your application is first rendered.

### Props

`services` **array**

The array of application [Services](./service.md). Each service object will consist of `name` (**string**), `initialState` (**object**), and `actions` (**object**) properties.

`options` **object**

Contains the Launch.IO configuration properties:

- `enableTimeTravel` (**boolean**) indicates whether or not [time travel debugging](./timeTravelDebugging.md) is enabled. This has a default value of `false` and it should not be enabled in non-development environments.

- `timeTravelHistoryLimit` (**number**) indicates how many time travel actions are stored in history. This has a default value of 50.

### Example

```jsx
import React from "react";
import { initializeLaunch } from "launch.io";

const calculatorService = {
  name: "calculator",

  initialState: {
    value: 0,
  },

  actions: {
    increase: ({ state }) => ({ value: state.value + 1 }),
    decrease: ({ state }) => ({ value: state.value - 1 }),
  },
};

initializeLaunch([calculatorService], { enableTimeTravel: true });

const App = () => {
  return <div className="MyApp">...</div>;
};

export default App;
```
