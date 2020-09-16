# ![Launch.IO Logo](./logo/logo-small.png)

Launch.IO is an Ultra Hip, Simple, Smart, and Fast, Time Traveling React State Management Library.

It provides a means to easily and consistently split up your application state into different services. Create action functions in those services that will predictably update your application state time and time again. (Batteries and [Time Travel Debugging](https://en.wikipedia.org/wiki/Time_travel_debugging) are included.)

You probably don't need all of the overhead and features of the other state management libraries. You just need Launch.IO and some good ice cream.

Simple. Smart. Fast.

Everything you need. (Except for the ice cream.)

## Installation

```
npm install launch.io
```

## Getting Started

Create your application services. Each service should have a `name`, `initialState`, and a set of `actions`.

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

Wrap your React application with the Launch.IO `LaunchProvider` component and pass your `array` of application services into the `createServiceApi`.

```jsx
import React from "react";
import { LaunchProvider, createServiceApi } from "launch.io";

const App = () => {
  return (
    <LaunchProvider
      serviceApi={createServiceApi([calculatorService], {
        enableTimeTravel: true,
      })}
    >
      <div className="MyApp">...</div>
    </LaunchProvider>
  );
};

export default App;
```

Use the Launch.IO `useLaunch` hook to access your services state and actions. Launch actions, using the `launch` function, within your React components.

```jsx
import React from "react";
import { useLaunch } from "launch.io";

const CalculatorForm = () => {
  const { state, actions, launch } = useLaunch();

  const handleIncrease = () => {
    launch(actions.calculator.increase());
  };

  const handleDecrease = () => {
    launch(actions.calculator.decrease());
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

## Tell Me More

Launch.IO is an abstraction around React's [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) and [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) with a healthy dose of time travel debugging. That's it! But, it's oh so cool, because you can launch things.

Because it relies on pure functions, it has the predictable state management of [Redux](https://github.com/reduxjs/redux), except there is no boilerplate and it's not Redux.

## Documentation

What do you mean?! You pretty much know the library by now. Get at it!

That said, you're probably wondering about time travel debugging. It's in Launch.IO (hint: `state._history` or `actions._history`), but I'll publish the official docs fairly soon.

## Stats

The hipness factor of this library is off the charts.

Check out the official stats.

| Category        | Rating         |
| --------------- | -------------- |
| Complexity      | `Ultra Simple` |
| Awareness       | `Ultra Smart`  |
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
