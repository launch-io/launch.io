# ![Launch.IO Logo](../../logo/logo-small.png) Terminology

### Definitions

**Services**: This is an object that contains a slice of the application state that can only be changed by a Service Action. All of the Services operate independent of one another, on their own state, but collectively represent the entire application state.

**Service Action**: These are functions, defined in the Services, that return a new Service state when invoked via launching an Launch Action.

**Launch Action**: These are functions that created by Launch.IO for each Service Function defined. These are used in conjunction with [`launch`](./useLaunch.md) to subsequently execute Service Functions.
