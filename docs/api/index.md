# ![Launch.IO Logo](../../logo/logo-small.png) API Reference

Launch.IO is an abstraction around React's [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) and [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) with time travel debugging built-in.

Its goals are to be tiny, fast, and super simple to use while still being an extremely capable state management library.

It relies on pure functions so it has the predictable state management of [Redux](https://github.com/reduxjs/redux), except there is no boilerplate and it's certainly not Redux.

Grab yourself a bowl of ice cream, sit back, and enjoy the Launch.IO API. You'll likely finish these API documents before your bowl of ice cream.

Review the [Terminology](./terminology.md) before diving in.

### Exports

- [`LaunchProvider`](./launchProvider.md)
- [`useLaunch`](./useLaunch.md)

### Definitions

- [`Service`](./service.md)

### Odds and Ends

- [Time Travel Debugging](./timeTravelDebugging.md)
- [Async Calls](./asyncExample.md)
