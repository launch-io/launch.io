# ![Launch.IO Logo](../../logo/logo-small.png) Terminology

Back to [API Reference](./index.md).

---

### Definitions

#### Services

This is an object that contains a slice of the application state that can only be changed by Service Actions within. All of the Services operate independent of one another, on their own Service state, but collectively all of these Services represent the entire application state.

#### Service Action

These are functions which are defined in the Services. They return a new Service state when invoked via a Launch Action.

#### Launch Action

These are functions, that are created by Launch.IO for each Service Action defined, and they are used to subsequently invoke Service Actions.
