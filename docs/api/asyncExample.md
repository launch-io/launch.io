# ![Launch.IO Logo](../../logo/logo-small.png) Async Example

Back to [API Reference](./index.md).

---

There are many times that you'll want to make `async`/`await` calls in conjunction with your Launch.IO service actions. This can be done just like one would expect.

### Tips

Remember that Launch.IO is a state management library; managing state is its only focus. It doesn't care about anything else. Fetching or posting to an API, for example, is independent of Launch.IO.

### Example

```javascript
const initialState = {
  firstName: "",
  lastName: "",
  isLoading: false,
};

const actions = {
  requestName: ({ state }) => ({ ...state, isLoading: true }),

  receiveName: ({ state }, payload) => {
    const newName = payload.name.split(" ");

    return {
      firstName: newName[0],
      lastName: newName[1],
      isLoading: false,
    };
  },

  fetchName: async ({ actions }) => {
    actions.requestName();

    const response = await fetch(`[url]`);
    const data = await response.json();

    actions.receiveName({ name: data.name });
  },
};

export default {
  name: "name",
  initialState,
  actions,
};
```
