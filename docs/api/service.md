# ![Launch.IO Logo](../../logo/logo-small.png) Service

Please note that _service actions_ are those functions that return new state whereas _launch actions_, an abstraction created by Launch.IO, are used in conjunction with the `launch` function to subsequently dispatch _service actions_.

---

Each service object must contain `name` (`string`), `initialState` (`object`), and `actions` (`object`) properties.

### Properties

`name` is a `string` that is the name of the service and it also defines how to access `state` for this service from the [`useLaunch`](./useLaunch.md) hook.

`initialState` is an `object` that initializes the state for the service.

`actions` is an `object` of service actions `functions` that can be called to change the state for the service. A service function receives `context` and `payload` arguments and it must return a new service state object.

The `context` argument is an `object` that consists of `state`, `actions`, and `launch` properties. These are the same types that are returned from the [`useLaunch`](./useLaunch.md) hook **except** that they are scoped to the local service. The `launch` function can be used to dispatch other service actions with the service function. An example of this can be found in the [`async example`](./asyncExample.md).

The `payload` argument is an `object` that is passed to the service action via the `launch` function that is also found in the [`useLauch`](./useLaunch.md) hook properties.

### Tips

It is recommended that your service functions do not mutate state. Instead they should return a brand new state object.

Service actions are able to launch actions and an example of this can be found in the [async example](./asyncExample.md).

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
