export interface CalculatorState {
  value: number;
}

const initialState: CalculatorState = {
  value: 0,
};

const actions = {
  increase: ({ state }, payload: number) => ({ value: state.value + payload }),
  decrease: ({ state }, payload: number) => ({ value: state.value - payload }),
};

export default {
  name: "calculator",
  initialState,
  actions,
};
