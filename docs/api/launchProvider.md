# ![Launch.IO Logo](../../logo/logo-small.png) LaunchProvider

`LaunchProvider` is a `React` component that should wrap your application.

### Props

`services` **array**

The array of application [Services](./service.md). Each service object will consist of `name` (**string**), `initialState` (**object**), and `actions` (**object**) properties.

`options` **object**

Contains the Launch.IO configuration properties:

- `enableTimeTravel` (**boolean**) indicates whether or not time travel debugging is enabled. This has a default value of `false` and it should not be enabled in non-development environments.

### Example

```jsx
import React from "react";
import { LaunchProvider } from "launch.io";

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

const App = () => {
  return (
    <LaunchProvider
      services={[calculatorService]}
      options={{ enableTimeTravel: true }}
    >
      <div className="MyApp">...</div>
    </LaunchProvider>
  );
};

export default App;
```
