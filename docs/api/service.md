# ![Launch.IO Logo](../../logo/logo-small.png) Service

Please note that _service actions_ are those functions that return new state whereas _launch actions_, an abstraction created by Launch.IO, are used in conjunction with the `launch` function to subsequently dispatch _service actions_.

---

Each service object must contain `name` (_String_), `initialState` (_Object_), and `actions` (_Object_ of _Functions_) properties.

### Properties

`name`: The name of the service and it also defines how to access `state` for this service from the [`useLaunch`](./useLaunch.md) hook.

`initialState`: Represents the entire state for the service.

`actions`: Each function represents a service action that can be called to change the state for the service. A service function receives `context` and `payload` arguments and it must return a new service state object.

The `context` (_Object_) argument consists of `state`, `actions`, and `launch` properties. These are the same types that are returned from the [`useLaunch`](./useLaunch.md) hook **except** that they are scoped to the local service. The `launch` function can be used to dispatch other service actions with the service function. An example of this can be found in the [`async example`](./asyncExample.md).

The `payload` (_Object_) argument is passed to the service action via the `launch` function also found in the [`useLauch`](./useLaunch.md) hook properties.

### Tips

It is recommended that your service functions do not mutate state. Instead they should return a brand new state object.

### Example

```javascript
const calculatorService = {
  name: "calculator",

  initialState: {
    value: 0,
  },

  actions: {
    increase: ({ state, actions, launch }, payload) => ({
      value: state.value + payload,
    }),

    decrease: ({ state, actions, launch }, payload) => ({
      value: state.value - payload,
    }),
  },
};
```
