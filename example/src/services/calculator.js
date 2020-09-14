const initialState = {
  value: 0,
};

const actions = {
  increase: ({ state }) => ({ value: state.value + 1 }),
  decrease: ({ state }) => ({ value: state.value - 1 }),
};

export default {
  name: "calculator",
  initialState,
  actions,
};
