# ![Launch.IO Logo](../../logo/logo-small.png) Time Travel Debugging

Launch.IO has built-in time travel debugging.

It is able to do so because it relies on pure functions ([service actions](./service.md)). This funcionality allows for the application to step back and forward in time. Changing state, regardless of which point in time, will clear any pending future actions.

Anytime the application steps forward or backwards in time, Launch.IO will replay all actions (to the point in time) against the initial state of the application.

### Enable

Time Travel debugging is enabled by setting `enableTimeTravel` to `true` for the Launch.IO options provided to the [`LaunchProvider`]('./launchProvider).

### Access

Time Travel launch actions are accessed via `actions._history`. All of these are accessed via the [`useLaunch`](./useLaunch.md) hook.

### Example

```javascript
import React from "react";
import { useLaunch } from "launch.io";

const TimeTravel = (props) => {
  const { actions } = useLaunch();

  const rewind = () => {
    actions._history.stepBack();
  };

  const fastForward = () => {
    actions._history.stepForward();
  };

  return (
    <div>
      <button type="button" onClick={rewind}>
        Rewind Time
      </button>
      <button type="button" onClick={fastFoward}>
        Fast Forward Time
      </button>
    </div>
  );
};

export default TimeTravel;
```
