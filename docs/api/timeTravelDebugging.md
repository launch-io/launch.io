# ![Launch.IO Logo](../../logo/logo-small.png) Time Travel Debugging

Launch.IO has built-in time travel debugging.

It is able to do so because it relies on pure functions ([service actions](./service.md)). This funcionality allows for the application to step back and forward in time. Changing state, regardless of which point in time, will clear any pending future actions.

Anytime the application steps forward or backwards in time, Launch.IO will replay all actions (to the point in time) against the initial state of the application.

This feature is not intended for a production environment; it is intended for a development environments.

### Enable

Time Travel debugging is enabled by setting `enableTimeTravel` to `true` for the Launch.IO options provided to [`initializeLaunch`](./initializeLaunch.md).

### Warning

Launch.IO will store all action payloads alongside the actions that are invoked when Time Travel Debugging is enabled. This could result in memory bloat or performance issues if the payloads are large and many _and/or_ payloads are unintentionally being stored. E.g. A React [`SyntheticEvent`](https://reactjs.org/docs/events.html).

The amount of time travel actions stored in history can be controlled/minimized by changing the value of `timeTravelHistoryLimit` for the Launch.IO options provided to [`initializeLaunch`](./initializeLaunch.md). The default has a value 50.

```jsx
// Do not do this
<button type="button" onClick={calculator.increase}>
```

```javascript
// Instead, do this and ignore the SyntheticEvent
<button type="button" onClick={(e) => calculator.increase()}>
```

### Access

Time Travel launch actions are accessed via `actions._history`. All of these are accessed via the [`useLaunch`](./useLaunch.md) hook.

### Example

```javascript
import React from "react";
import { useLaunch } from "launch.io";

const TimeTravel = (props) => {
  const history = useLaunch(({ actions }) => actions._history);

  return (
    <div>
      <button type="button" onClick={() => history.stepBack()}>
        Rewind Time
      </button>
      <button type="button" onClick={() => history.stepForward()}>
        Fast Forward Time
      </button>
    </div>
  );
};

export default TimeTravel;
```
