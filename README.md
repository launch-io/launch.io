# ![Launch.IO Logo](./logo/logo-small.png)

[![Build](https://github.com/jbillmann/launch.io/workflows/Launch.IO%20Build/badge.svg)](https://github.com/jbillmann/launch.io/actions?query=workflow%3A%22Launch.IO+Build%22)
[![Npm version](https://img.shields.io/npm/v/launch.io.svg)](https://npmjs.org/package/launch.io)
[![Bundlephobia](https://img.shields.io/bundlephobia/minzip/launch.io)](https://bundlephobia.com/result?p=launch.io)
[![Npm types](https://img.shields.io/npm/types/launch.io.svg)](https://npmjs.org/package/launch.io)

Launch.IO is an Ultra Hip, Simple, and Fast, Time Traveling React State Management Library.

It provides the means to easily and consistently split up your application state into different services. Create actions within those services that will predictably update your application state time and time again. (Batteries and [Time Travel Debugging](./docs/api/timeTravelDebugging.md) are included.)

You probably don't need all the overhead and alll of the features of the other state management libraries. You just need Launch.IO and some good ice cream.

Simple. Fast. Tiny.

Everything you need. (Except for the ice cream.)

## Installation

```
npm install launch.io
```

## Getting Started

Create your application services (as many as you'd like!). Each service should have a `name`, `initialState`, and a set of `actions`.

```javascript
const calculatorService = {
  name: "calculator",

  initialState: {
    value: 0,
  },

  // It is recommended that you do not mutate the incoming state; instead return a brand new state.
  actions: {
    increase: ({ state }) => ({ value: state.value + 1 }),
    decrease: ({ state }) => ({ value: state.value - 1 }),
  },
};
```

Initialize your React application with Launch.IO using `initializeLaunch` and pass your `array` of application services along with any `options` you'd like to specify.

```jsx
import React from "react";
import { initializeLaunch } from "launch.io";

initializeLaunch([calculatorService], { enableTimeTravel: true });

const App = () => {
  return <div className="MyApp">...</div>;
};

export default App;
```

Use the Launch.IO `useLaunch` hook to access your services state and launch actions.

```jsx
import React from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const state = useLaunch(({ state }) => state.calculator);
  const actions = useLaunch(({ actions }) => actions.calculator);

  return (
    <div>
      <p>Value: {state.value}</p>
      <button type="button" onClick={() => state.increase()}>
        Increase
      </button>
      <button type="button" onClick={() => state.decrease()}>
        Decrease
      </button>
    </div>
  );
};
```

## Documentation

What do you mean?! You pretty much know the library by now. Get at it!

[API Documentation](./docs/api/index.md)

## Stats

The hipness factor of this library is off the charts.

Check out the official stats.

| Category        | Rating         |
| --------------- | -------------- |
| Complexity      | `Ultra Simple` |
| Size            | `Ultra Tiny`   |
| Performance     | `Ultra Fast`   |
| Overall Ranking | `Ultra Hip`    |

## Reviews

> This is direction that React state management libraries need to be headed in!
> -- <cite>Anonymous</cite>

> I love ice cream.
> -- <cite>Anonymous</cite>

> Impressive! Makes me question why have I been using other complex state management libraries when this simply gets the job done?!
> -- <cite>Anonymous</cite>

> This library is lit and totally vibing!
> -- <cite>Anonymous</cite>

> Dad, are you working on your library, again?! Let's play some Minecraft.
> -- <cite>Anonymous</cite>

More coming soon!

## License

[MIT](LICENSE)
