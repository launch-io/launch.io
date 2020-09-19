# ![Launch.IO Logo](../../logo/logo-small.png) LaunchProvider

`LaunchProvider` is a `React` component that should wrap your application.

### Props

`services` (_Array_): An `array` of your application [services](./service.md). Each service object will consist of `name` (_String_), `initialState` (_Object_), and `actions` (_Object_ of _Functions_) properties.

`options` (_Object_): A Launch.IO `ServiceOptions` object.

- `enableTimeTravel` (_Boolean_): Indicates whether or not time travel debugging is enabled. This has a default value of `false` and it should not be enabled in non-development environments.

### Example

```jsx
import React from "react";
import { LaunchProvider } from "launch.io";
import services from "./services";

const App = () => {
  return (
    <LaunchProvider services={services} options={{ enableTimeTravel: true }}>
      <div className="MyApp">...</div>
    </LaunchProvider>
  );
};

export default App;
```
