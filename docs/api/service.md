# ![Launch.IO Logo](../../logo/logo-small.png) Service

Please be sure to have reviewd [terminology](./terminology.md) before reviewing services.

---

Each service object must contain `name` (**string**), `initialState` (**object**), and `actions` (**object**) properties.

### Properties

`name` **string**

The name of the service and it also defines how to access `state` for this service from the [`useLaunch`](./useLaunch.md) hook.

`initialState` **object**

The beginning state for the service.

`actions` **object**

Service actions `functions` that can be called to change the state for the service. A service function receives `context` and `payload` arguments and it must return a new service state object.

The `context` argument is an `object` that consists of `state`, and `actions` properties. These are the same types that are returned from the [`useLaunch`](./useLaunch.md) hook **except** that they are scoped to the local service. Service actions can be dispatch other launch actions. An example of this can be found in the [`async example`](./asyncExample.md).

The `payload` argument is an `object` that is passed into the launch action.

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
    increase: ({ state, actions }, payload) => ({
      value: state.value + payload,
    }),

    decrease: ({ state, actions }, payload) => ({
      value: state.value - payload,
    }),
  },
};
```
